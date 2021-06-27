import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  async save(@Body() createCustomerDto: CreateCustomerDto): Promise<void> {
    return await this.service.save(createCustomerDto);
  }
}
