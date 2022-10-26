// code adapted from official Bitfinex example
// https://gist.github.com/prdn/b8c067c758aab7fa3bf715101086b47c

import WS from 'ws';
import * as _ from 'lodash';
import CRC from 'crc-32';
import wait from '@utils/await';
import { WS_ENABLE_CHECKSUM } from '@config';

interface Snapshot {
  price: number;
  count: number;
  amount: number;
}

type PricesData = Map<number, Snapshot>;

type SnapshotTuple = [number, number, number]; //[price,count,amount]

interface Snapshots {
  bids: string[];
  asks: string[];
}

type Operation = 'bids' | 'asks';

export interface Book {
  bids: PricesData;
  asks: PricesData;
  snapshotValues: Snapshots;
  messageCounter: number;
}

type WSStatus = 'connected' | 'disconnected' | 'reconnecting';

class WSBooks {
  wshost: string;
  book: Book;
  wsInstance: WS;
  seq: number;

  pair: string;

  wsStatus: WSStatus = 'disconnected';

  constructor(pair: string, host = 'wss://api.bitfinex.com/ws/2') {
    this.wshost = host;
    this.pair = pair;

    this.wsInstance = new WS(this.wshost, {
      /* rejectUnauthorized: false */
    });
  }

  async getBook(retry = 0): Promise<Book> {
    if (retry === 5) {
      return Promise.reject('ORDER BOOK NOT SYNC, WS reconnecting');
    }

    if (this.wsStatus !== 'connected') {
      await wait(1000);
      return this.getBook(retry + 1);
    }
    return Promise.resolve(this.book);
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
    this.book = { bids: new Map(), asks: new Map(), snapshotValues: { bids: [], asks: [] }, messageCounter: 0 };

    if (WS_ENABLE_CHECKSUM) {
      console.info('CHECKSUM IN WS ENABLED, YOU CAN DISABLE IF YOU FOUND CONSTANT WS DISCONNECTIONS');
    }

    const FLAG_CODE = WS_ENABLE_CHECKSUM ? 65536 + 131072 : 65536;

    this.wsInstance.send(JSON.stringify({ event: 'conf', flags: FLAG_CODE }));
    this.wsInstance.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        pair: this.pair,
        prec: 'P0',
        len: 100,
      }),
    );
    this.seq = null;
    this.wsStatus = 'connected';
    this.wsInstance.on('close', this.onClose.bind(this));
    this.wsInstance.on('message', this.onProcessMessage.bind(this));
  }

  private onClose() {
    console.info('closing WS');
    this.wsStatus = 'disconnected';
  }

  /**
   * CHECK checksum provided by the websocket channel in a message, this checksum must match
   * a calculation explained here: https://docs.bitfinex.com/docs/ws-websocket-checksum
   * @param checksumValue number
   * @private
   */
  private processChecksum(checksumValue: number) {
    const checksumData = [];
    const bids_keys = this.book.snapshotValues.bids;
    const asks_keys = this.book.snapshotValues.asks;

    //Compile your data sequentially. The calculation will need you to input the 25 highest bids and the 25 lowest asks.
    //https://docs.bitfinex.com/docs/ws-websocket-checksum
    for (let i = 0; i < 25; i++) {
      if (bids_keys[i]) {
        const price = bids_keys[i];
        const pp = this.book.bids.get(+price);

        checksumData.push(pp.price, pp.amount);
      }
      if (asks_keys[i]) {
        const price = asks_keys[i];
        const pp = this.book.asks.get(+price);

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

  private initializeBook(data: SnapshotTuple[]) {
    _.each(data, (snapshot: SnapshotTuple) => {
      const [price, count, amount] = snapshot;
      const pp = { price, count, amount };
      const side = amount >= 0 ? 'bids' : 'asks';

      this.book[side].set(price, pp);
    });
  }

  private onProcessMessage(message: string) {
    if (this.wsStatus !== 'connected') return; //avoid old ws instance messages
    const msg = JSON.parse(message);

    if (msg.event) return;

    //if message is heartbeat
    if (msg[1] === 'hb') {
      //hb es heartbeat
      this.seq = +msg[2];
      return;

      // if message is checksum
    } else if (msg[1] === 'cs') {
      // [CHAN_id,"cs",CHECKSUM]
      this.seq = +msg[3];
      this.processChecksum(msg[2]);
      return;
    }

    //[CHANNEL_ID, [[PRICE,COUNT,AMOUNT],...]]
    //[17082,[[7254.7,3,3.3]]]
    if (this.book.messageCounter === 0) {
      this.initializeBook(msg[1]);
    } else {
      const cseq = +msg[2];
      const [price, count, amount] = msg[1];

      if (!this.seq) {
        this.seq = cseq - 1;
      }

      if (cseq - this.seq !== 1) {
        console.error('OUT OF SEQUENCE', this.seq, cseq);
        this.restart().then(() => console.info('reconnected'));
      }

      this.seq = cseq;

      const pp: Snapshot = { price, count, amount };

      // this code changed from original WS according to docs
      //when count = 0 then you have to delete the price level.
      if (pp.count === 0) {
        // if amount = 1 then remove from bids (>0)
        if (pp.amount === 1) {
          this.book.bids.delete(pp.price);
          //if amount = -1 then remove from asks (<0)
        } else if (pp.amount === -1) {
          this.book.asks.delete(pp.price);
        }
        //when count > 0 then you have to add or update the price level
      } else if (pp.count > 0) {
        //if amount > 0 then add/update bids,if amount < 0 then add/update asks
        const side = pp.amount >= 0 ? 'bids' : 'asks';
        pp.amount = Math.abs(pp.amount);
        this.book[side].set(pp.price, pp);
      }
    }

    _.each(['bids', 'asks'] as Operation[], side => {
      const sBook = this.book[side];
      const bPrices = [...sBook.keys()];

      const sortedPrices = bPrices.sort(function (a, b) {
        if (side === 'bids') {
          return a >= b ? -1 : 1;
        } else {
          return a <= b ? -1 : 1;
        }
      });

      this.book.snapshotValues[side] = sortedPrices.map(v => v.toString());
    });

    this.book.messageCounter++;
    //console.log(JSON.stringify(this.book.snapshotValues));
  }
}

export default WSBooks;
