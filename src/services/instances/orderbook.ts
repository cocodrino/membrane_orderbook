import OrderbookService from '@services/orderbook.service';
import { WS_PAIRS } from '@config';

export const orderbookService = new OrderbookService(WS_PAIRS);
