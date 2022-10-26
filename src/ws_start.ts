import WSBooks from '@/websocket/WSBooks';
import { WS_PAIR } from '@config';

const ws = new WSBooks(WS_PAIR);

export default ws;
