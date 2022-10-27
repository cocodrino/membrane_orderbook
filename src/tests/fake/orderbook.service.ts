import { default as OrderBookOriginal } from '../../services/orderbook.service';
import sampleData from '../sampleData';
import { OrderBook } from '../../interfaces/orderbook.interface';

class OrderbookService extends OrderBookOriginal {
  constructor(pairs: string[], host = 'wss://api.bitfinex.com/ws/2') {
    console.info('=====MOCK ORDERBOOK =====================');
    super(pairs, host);

    const data: Map<String, OrderBook> = new Map();
    const fakeBook = {
      bids: new Map(Object.entries(sampleData.book.bids).map(([k, v]) => [+k, v])),
      asks: new Map(Object.entries(sampleData.book.asks).map(([k, v]) => [+k, v])),
      snapshotValues: { bids: [], asks: [] },
      messageCounter: 0,
      seq: null,
    };

    data.set('BTCUSD', fakeBook);
    this.orderBooks = data;

    this.wsStatus = 'connected';
  }
}

export default OrderbookService;
