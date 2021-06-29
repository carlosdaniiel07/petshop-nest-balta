import { IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty()
  name: string;
}
