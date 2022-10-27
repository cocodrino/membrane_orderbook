import { BadRequestError, Body, Controller, Get, NotFoundError, Param, Post, UseBefore } from 'routing-controllers';
import OrderbookService from '@services/orderbook.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { EffectivePriceDTO } from '@dtos/orderbook.dto';
import { WS_PAIRS } from '@config';
import { FinalPriceResponse, OrderBook, Tick } from '@interfaces/orderbook.interface';
import { HttpException } from '@exceptions/HttpException';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller()
export class OrderBookController {
  public ob = new OrderbookService(WS_PAIRS);

  //not required by the test but useful for debugging
  @Get('/orderbook/:symbol')
  @OpenAPI({ summary: 'Return orderbook for introduced symbol' })
  getOrderBook(@Param('symbol') symbol: string) {
    const data: OrderBook | undefined = this.ob.getOrderBook(symbol.toUpperCase());

    if (!data) {
      throw new HttpException(400, 'data not found for the symbol');
    }

    return { orderbook: data };
  }

  @Get('/orderbook/tick/:symbol')
  @OpenAPI({ summary: 'Return bid and ask price' })
  async getTick(@Param('symbol') symbol: string) {
    const data: Tick | undefined = await this.ob.getTick(symbol.toUpperCase());

    if (!data) {
      throw new NotFoundError('symbol not found');
    }

    return { tick: data };
  }

  @Post('/orderbook/price')
  @UseBefore(validationMiddleware(EffectivePriceDTO, 'body'))
  @OpenAPI({ summary: 'Return effective price for some buy or sell' })
  async effectivePrice(@Body() data: EffectivePriceDTO) {
    const response: FinalPriceResponse | undefined = await this.ob.getFinalPrice(data.pair, data.operation, data.amount);

    if (!response) {
      throw new BadRequestError('pair not found');
    }

    return response;
  }
}
