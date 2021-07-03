import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  product: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
