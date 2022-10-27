export interface Snapshot {
  price: number;
  count: number;
  amount: number;
}

export type Payment = Omit<Snapshot, 'count'>;

export interface Tick {
  bid: Snapshot;
  ask: Snapshot;
}

export type PricesData = Map<number, Snapshot>;

export type SnapshotTuple = [number, number, number]; //[price,count,amount]

export interface Snapshots {
  bids: string[];
  asks: string[];
}

export interface FinalPriceResponse {
  effectivePrice: number;
  totalBuyOrSell: number;
  levels: Payment[];
}

export type Operation = 'bids' | 'asks';

export interface OrderBook {
  bids: PricesData;
  asks: PricesData;
  snapshotValues: Snapshots;
  messageCounter: number;
  seq?: number;
}

export type WSStatus = 'connected' | 'disconnected' | 'reconnecting';
