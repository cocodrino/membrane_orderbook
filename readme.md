# ORDER BOOK API

## How Run
```bash
npm install
npm run dev
```

#### if you are using other package manager instead of npm you need replace the npm command in the package.json

## Project structure
Importants files are

1) **src/config/index** Handle environment variables
2) **src/controllers/orderbook.controller.ts** controllers and endpoints
3) **src/http/orderbooks.http** file to test requests
4) **src/services/orderbook.service.ts** implementation of WS for bring realtime book data
5) **src/tests/ob.service.test.ts** tests to check logic of orderbook.service
6) **src/tests/ob.test.ts** tests to check controllers


## REQUEST FILE
Under **src/http/orderbooks.http** you'll find a request file in order to test the endpoints locally

## ABOUT TESTS
Test uses a fake implementation of **orderbook.services** placed inside of *src/tests/fake/orderbook.service.ts*
this dummy implementation always use the same book data placed in **sampleData.ts** in order to generate always the
same expected result and check the logic for the different calculations.

## ABOUT ENVIRONMENT VARIABLES
I had a lot of problems with the checksum for Bitfinex WS, my internet connection is not totally reliable and many times
the checksum failed after some seconds, I implemented some logic in order to reconnect the websocket if checksum fails and
method response wait a few seconds if ws is connecting.

I created an environment variable that can be set in order to enable or disable checksum, in production this must be enabled,
but locally you can omit this

````
WS_PAIRS = BTCUSD,ETHUSD
````
