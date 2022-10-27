import OrderbookService from '@services/orderbook.service';
import { WS_PAIRS } from '@config';

const ws = new OrderbookService(WS_PAIRS);

export default ws;
