// code adapted from official Bitfinex example
// https://gist.github.com/prdn/b8c067c758aab7fa3bf715101086b47c

import WS from 'ws';
import * as _ from 'lodash';
import CRC from 'crc-32';
import wait from '@utils/await';
import { WS_ENABLE_CHECKSUM } from '@config';
import * as console from 'console';
import { BuyOrSell } from '@dtos/orderbook.dto';
import { OrderBook, Snapshot, SnapshotTuple, FinalPriceResponse, Payment, Tick, Operation, WSStatus } from '@interfaces/orderbook.interface';

class OrderbookService {
  wshost: string;
  orderBooks: Map<String, OrderBook> = new Map();
  wsInstance: WS;
  pairs: string[];

  wsStatus: WSStatus = 'disconnected';

  channelsToPair: Map<number, string> = new Map();

  constructor(pairs: string[], host = 'wss://api.bitfinex.com/ws/2') {
    this.wshost = host;
    this.pairs = pairs;

    this.wsInstance = new WS(this.wshost, {
      /* rejectUnauthorized: false */
    });
  }

  private getPairFromChanID(chanID: number): string {
    const symbol = this.channelsToPair.get(chanID);

    if (!symbol) {
      console.error(`ERROR GETTING PAIR FOR ${chanID} restarting WS in order to initialize again data`);
      this.restart();
    }

    return symbol;
  }

  async getTick(symbol: string, retry = 0): Promise<Tick | undefined> {
    if (retry === 5) {
      return Promise.reject('ORDER BOOK NOT SYNC, WS reconnecting');
    }

    if (this.wsStatus !== 'connected') {
      await wait(1000);
      return this.getTick(symbol, retry + 1);
    }

    const data = this.orderBooks.get(symbol);

    if (!data) return;

    const [, bidValue] = [...data.bids][data.bids.size - 1]; //for bids take the last value
    const [, askValue] = [...data.asks][0]; //for ask take the first value

    return {
      bid: bidValue,
      ask: askValue,
    };
  }

  // TODO refactor code duplication for retry
  async getFinalPrice(symbol: string, operation: BuyOrSell, fundAmount: number, retry = 0): Promise<FinalPriceResponse | undefined> {
    if (retry === 5) {
      return Promise.reject('ORDER BOOK NOT SYNC, WS reconnecting');
    }

    if (this.wsStatus !== 'connected') {
      await wait(1000);
      return this.getFinalPrice(symbol, operation, fundAmount, +1);
    }

    const bidOrAsk = operation === 'buy' ? 'asks' : 'bids';
    const data = this.orderBooks.get(symbol)[bidOrAsk];

    if (!data) return;

    let remainingFunds = fundAmount;
    const paymentLevels: Payment[] = [];

    //if is asks we'll go in the same incremental order as it is stored in data
    //if it's bids then we need to reverse the order to dec (we'll go from big to low)
    const values = bidOrAsk === 'asks' ? data.values() : [...data.values()].reverse();

    for (const snapshot of values) {
      const { price, amount } = snapshot;
      const totalPayLevel = price * amount;

      if (totalPayLevel > remainingFunds) {
        paymentLevels.push({ price, amount: remainingFunds / price });
        break;
      }

      paymentLevels.push({ price, amount });
      remainingFunds -= price * amount;
    }

    const totalBuy = paymentLevels.reduce((mem, pay) => {
      return mem + pay.amount;
    }, 0);
    const effectivePrice = fundAmount / totalBuy;

    return {
      effectivePrice,
      totalBuyOrSell: totalBuy,
      levels: paymentLevels,
    };
  }

  getOrderBook(symbol: string): OrderBook | undefined {
    return this.orderBooks.get(symbol);
  }

  listen() {
    console.info('=====Start listening WS ===========');
    if (!this.wsInstance) console.error('no ws instance');

    this.wsInstance.on('open', this.onOpen.bind(this));
  }

  private async restart() {
    console.info('ORDER BOOK is not SYNC, restarting WS connection');
    this.wsStatus = 'reconnecting';
    this.wsInstance.terminate();
    await wait(500);
    this.wsInstance = new WS(this.wshost, {
      /* rejectUnauthorized: false */
    });
    this.listen();
  }

  private onOpen() {
    console.log('WS open');

    if (WS_ENABLE_CHECKSUM) {
      console.info('CHECKSUM IN WS ENABLED, YOU CAN DISABLE IF YOU FOUND CONSTANT WS DISCONNECTIONS');
    }

    const FLAG_CODE = WS_ENABLE_CHECKSUM ? 65536 + 131072 : 65536;

    this.wsInstance.send(JSON.stringify({ event: 'conf', flags: FLAG_CODE }));

    this.pairs.forEach(pair => {
      const value: OrderBook = {
        bids: new Map(),
        asks: new Map(),
        snapshotValues: { bids: [], asks: [] },
        messageCounter: 0,
        seq: null,
      };

      this.orderBooks.set(pair, value);
    });

    this.pairs.forEach(pair => {
      this.wsInstance.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          pair: pair,
          prec: 'P0',
          len: 100,
        }),
      );
    });

    this.wsStatus = 'connected';
    this.wsInstance.on('close', this.onClose.bind(this));
    this.wsInstance.on('message', this.onProcessMessage.bind(this));
  }

  private onClose() {
    console.info('closing WS');
    this.wsStatus = 'disconnected';
    this.channelsToPair = new Map();
  }

  /**
   * CHECK checksum provided by the websocket channel in a message, this checksum must match
   * a calculation explained here: https://docs.bitfinex.com/docs/ws-websocket-checksum
   * @param checksumValue number
   * @private
   */
  private processChecksum(pairName, checksumValue: number) {
    const checksumData = [];
    const bids_keys = this.orderBooks.get(pairName).snapshotValues.bids;
    const asks_keys = this.orderBooks.get(pairName).snapshotValues.asks;

    //Compile your data sequentially. The calculation will need you to input the 25 highest bids and the 25 lowest asks.
    //https://docs.bitfinex.com/docs/ws-websocket-checksum
    for (let i = 0; i < 25; i++) {
      if (bids_keys[i]) {
        const price = bids_keys[i];
        const pp = this.orderBooks.get(pairName).bids.get(+price);

        checksumData.push(pp.price, pp.amount);
      }
      if (asks_keys[i]) {
        const price = asks_keys[i];
        const pp = this.orderBooks.get(pairName).asks.get(+price);

        checksumData.push(pp.price, -pp.amount);
      }
    }

    const cs_str = checksumData.join(':');
    const cs_calc = CRC.str(cs_str);

    if (cs_calc !== checksumValue) {
      console.error('checksum failed, data is not sync');
      this.restart().then(() => console.info('restarted ws'));
    } else {
      console.debug('+++++++checksum valid: Local Book is SYNC correctly! +++++');
    }
  }

  private initializeBook(pairName: string, data: SnapshotTuple[]) {
    _.each(data, (snapshot: SnapshotTuple) => {
      const [price, count, amount] = snapshot;
      const pp = { price, count, amount };
      const side = amount >= 0 ? 'bids' : 'asks';

      this.orderBooks.get(pairName)[side].set(price, pp);
    });
  }

  private onProcessMessage(message: string) {
    if (this.wsStatus !== 'connected') return; //avoid old ws instance messages
    const msg = JSON.parse(message);
    //console.log(JSON.stringify(msg));

    if (['info', 'conf'].includes(msg.event)) {
      return;
    }

    if (msg.event === 'subscribed' && msg.chanId && msg.pair) {
      this.channelsToPair.set(msg.chanId, msg.pair);
      return;
    }

    const pair = this.getPairFromChanID(msg[0]);
    //if message is heartbeat
    if (msg[1] === 'hb') {
      //hb es heartbeat
      this.orderBooks.get(pair).seq = +msg[2];
      return;

      // if message is checksum
    } else if (msg[1] === 'cs') {
      // [CHAN_id,"cs",CHECKSUM]
      this.orderBooks.get(pair).seq = +msg[3];
      this.processChecksum(pair, msg[2]);
      return;
    }

    //[CHANNEL_ID, [[PRICE,COUNT,AMOUNT],...]]
    //[17082,[[7254.7,3,3.3]]]
    if (this.orderBooks.get(pair).messageCounter === 0) {
      this.initializeBook(pair, msg[1]);
    } else {
      const cseq = +msg[2];
      const [price, count, amount] = msg[1];

      if (!this.orderBooks.get(pair).seq) {
        this.orderBooks.get(pair).seq = cseq - 1;
      }

      this.orderBooks.get(pair).seq = cseq;

      const pp: Snapshot = { price, count, amount };

      // this code changed from original WS according to docs
      //when count = 0 then you have to delete the price level.
      if (pp.count === 0) {
        // if amount = 1 then remove from bids (>0)
        if (pp.amount === 1) {
          this.orderBooks.get(pair).bids.delete(pp.price);
          //if amount = -1 then remove from asks (<0)
        } else if (pp.amount === -1) {
          this.orderBooks.get(pair).asks.delete(pp.price);
        }
        //when count > 0 then you have to add or update the price level
      } else if (pp.count > 0) {
        //if amount > 0 then add/update bids,if amount < 0 then add/update asks
        const side = pp.amount >= 0 ? 'bids' : 'asks';
        pp.amount = Math.abs(pp.amount);
        this.orderBooks.get(pair)[side].set(pp.price, pp);
      }
    }

    _.each(['bids', 'asks'] as Operation[], side => {
      const sBook = this.orderBooks.get(pair)[side];
      const bPrices = [...sBook.keys()];

      const sortedPrices = bPrices.sort(function (a, b) {
        if (side === 'bids') {
          return a >= b ? -1 : 1;
        } else {
          return a <= b ? -1 : 1;
        }
      });

      this.orderBooks.get(pair).snapshotValues[side] = sortedPrices.map(v => v.toString());
    });

    this.orderBooks.get(pair).messageCounter++;
    //console.log(JSON.stringify(this.book.snapshotValues));
  }
}

export default OrderbookService;
