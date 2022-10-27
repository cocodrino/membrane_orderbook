import { BadRequestError, Body, Controller, Get, NotFoundError, Param, Post, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { EffectivePriceDTO } from '@dtos/orderbook.dto';
import { FinalPriceResponse, OrderBook, Tick } from '@interfaces/orderbook.interface';
import { HttpException } from '@exceptions/HttpException';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { orderbookService } from '@services/instances/orderbook';

@Controller()
export class OrderBookController {
  public ob = orderbookService;

  //not required by the test but useful for debugging
  @Get('/orderbook/book/:symbol')
  @OpenAPI({ summary: 'Return orderbook for introduced symbol' })
  getOrderBook(@Param('symbol') symbol: string) {
    const orderbook: OrderBook | undefined = this.ob.getOrderBook(symbol.toUpperCase());

    if (!orderbook) {
      throw new HttpException(400, 'data not found for the symbol');
    }

    return { orderbook };
  }

  @Get('/orderbook/tick/:symbol')
  @OpenAPI({ summary: 'Return bid and ask price' })
  async getTick(@Param('symbol') symbol: string) {
    const tick: Tick | undefined = await this.ob.getTick(symbol.toUpperCase());

    if (!tick) {
      throw new HttpException(400, 'data not found for the symbol');
    }

    return { tick };
  }

  @Post('/orderbook/price')
  @UseBefore(validationMiddleware(EffectivePriceDTO, 'body'))
  @OpenAPI({ summary: 'Return effective price for some buy or sell' })
  async effectivePrice(@Body() data: EffectivePriceDTO) {
    const response: FinalPriceResponse | undefined = await this.ob.getFinalPrice(data.pair, data.operation, data.amount);

    if (!response) {
      throw new HttpException(400, 'data not found for the symbol');
    }

    return response;
  }
}
