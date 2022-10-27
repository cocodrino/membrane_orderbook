import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import validateEnv from '@utils/validateEnv';
import ws from '@/ws_start';
import { OrderBookController } from '@controllers/orderbook.controller';

validateEnv();

const app = new App([AuthController, IndexController, UsersController, OrderBookController]);

ws.listen();
app.listen();
