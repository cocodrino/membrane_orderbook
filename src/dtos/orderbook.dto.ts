import { IsIn, IsNotEmpty, Min } from 'class-validator';

export type BuyOrSell = 'buy' | 'sell';

export class EffectivePriceDTO {
  @IsIn(['buy', 'sell'])
  public operation: BuyOrSell;

  @IsNotEmpty()
  public pair: string;

  @Min(0)
  public amount: number;
}
