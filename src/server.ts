import App from '@/app';

import { IndexController } from '@controllers/index.controller';

import validateEnv from '@utils/validateEnv';

import { OrderBookController } from '@controllers/orderbook.controller';
import { orderbookService } from '@services/instances/orderbook';

validateEnv();

const app = new App([IndexController, OrderBookController]);

app.listen();
orderbookService.listen();
