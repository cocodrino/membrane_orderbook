import OrderbookService from './fake/orderbook.service';

describe('for the WS Book', () => {
  let ws: OrderbookService;
  beforeAll(() => {
    ws = new OrderbookService(['BTCUSD']);
  });
  it('must return best tick bid and ask', async () => {
    const tick = await ws.getTick('BTCUSD');
    expect(tick.bid.price).toEqual(20749);
    expect(tick.bid.count).toEqual(5);
    expect(tick.bid.amount).toEqual(0.96691662);

    expect(tick.ask.price).toEqual(20750);
    expect(tick.ask.count).toEqual(3);
    expect(tick.ask.amount).toEqual(0.30567073);
  });

  it('must return effective price for buy', async () => {
    const priceResponse = await ws.getFinalPrice('BTCUSD', 'buy', 31500);
    console.log(priceResponse);
    expect(priceResponse.totalBuyOrSell).toEqual(1.5180036425524022);
    expect(priceResponse.effectivePrice).toEqual(20750.93834889306);

    //for first and second level we buy all
    expect(priceResponse.levels[0].amount).toEqual(0.30567073);
    expect(priceResponse.levels[1].amount).toEqual(1.10629085);
  });

  it('must return effective price for sell', async () => {
    const priceResponse = await ws.getFinalPrice('BTCUSD', 'sell', 40000);
    expect(priceResponse.levels.length).toBe(3);
    expect(priceResponse.totalBuyOrSell).toEqual(1.927856663695956);
    expect(priceResponse.effectivePrice).toEqual(20748.430499658993);

    //for first and second level we sell all
    expect(priceResponse.levels[0].amount).toEqual(0.96691662);
    expect(priceResponse.levels[1].amount).toEqual(0.82396506);
  });
});
