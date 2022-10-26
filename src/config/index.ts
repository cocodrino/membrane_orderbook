import { config } from 'dotenv';
import * as process from 'process';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const WS_ENABLE_CHECKSUM = process.env.WS_ENABLE_CHECKSUM === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, WS_PAIR } = process.env;
