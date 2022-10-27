import wait from '../utils/await';
import App from '../app';
import { OrderBookController } from './fake/orderbook.controller';
import request from 'supertest';
import { EffectivePriceDTO } from '../dtos/orderbook.dto';

describe('testing orderbook controller', () => {
  afterAll(async () => {
    await wait(500);
  });

  describe('[GET] /orderbook/tick/:symbol', () => {
    it('must return correctly if data exist for pair', async () => {
      const app = new App([OrderBookController]);
      const req = request(app.getServer()).get('/orderbook/tick/BTCUSD');

      return req.expect(200, {
        tick: {
          bid: { price: 20749, count: 5, amount: 0.96691662 },
          ask: { price: 20750, count: 3, amount: 0.30567073 },
        },
      });
    });

    it('must return error if pair doesnt exist', async () => {
      const app = new App([OrderBookController]);
      const req = request(app.getServer()).get('/orderbook/tick/SOLUSD');

      return req.expect(500);
    });
  });

  describe('[POST] /orderbook/price', () => {
    let requestData: EffectivePriceDTO;
    beforeEach(() => {
      requestData = {
        pair: 'BTCUSD',
        operation: 'buy',
        amount: 31500,
      };
    });

    it('must return correctly if passed values are correct', async () => {
      const app = new App([OrderBookController]);
      const req = request(app.getServer()).post('/orderbook/price').send(requestData);

      return req.expect(200, {
        effectivePrice: 20750.93834889306,
        totalBuyOrSell: 1.5180036425524022,
        levels: [
          { price: 20750, amount: 0.30567073 },
          { price: 20751, amount: 1.10629085 },
          { price: 20753, amount: 0.10604206255240223 },
        ],
      });
    });

    it('must return error if operation is invalid (not buy or sell)', async () => {
      const app = new App([OrderBookController]);
      // @ts-ignore
      requestData.operation = 'change';
      const req = request(app.getServer()).post('/orderbook/price').send(requestData);

      return req.expect(400);
    });

    it('must return error if price is less than 0', async () => {
      const app = new App([OrderBookController]);
      // @ts-ignore
      requestData.amount = -30;
      const req = request(app.getServer()).post('/orderbook/price').send(requestData);

      return req.expect(400);
    });

  });
});
