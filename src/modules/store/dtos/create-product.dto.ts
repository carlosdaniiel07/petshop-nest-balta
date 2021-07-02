import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

  @IsNumber()
  @IsPositive()
  price: number
}