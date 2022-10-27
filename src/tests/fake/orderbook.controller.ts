import { OrderBookController as OrderBookControllerOrig } from '../../controllers/orderbook.controller';
import OrderbookService from './orderbook.service';
import { WS_PAIRS } from '../../config';
import { Controller } from 'routing-controllers';

@Controller()
export class OrderBookController extends OrderBookControllerOrig {
  public ob = new OrderbookService(WS_PAIRS);
}
