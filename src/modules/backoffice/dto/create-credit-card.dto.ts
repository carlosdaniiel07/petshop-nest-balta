import { IsNotEmpty, Length } from 'class-validator';

export class CreateCreditCardDto {
  @IsNotEmpty()
  holder: string;

  @Length(16, 16)
  number: string;

  @Length(4, 4)
  expiration: string;
}
