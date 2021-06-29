import { IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(11, 11)
  document: string;
}
