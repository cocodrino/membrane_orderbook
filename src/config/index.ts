import { config } from 'dotenv';
import * as process from 'process';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const WS_ENABLE_CHECKSUM = process.env.WS_ENABLE_CHECKSUM === 'true';
export const WS_PAIRS: string[] = process.env.WS_PAIRS.trim().split(',');
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
