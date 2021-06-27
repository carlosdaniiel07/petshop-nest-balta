import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly service: CustomerService) {}

  @Post()
  async save(@Body() createCustomerDto: CreateCustomerDto): Promise<void> {
    this.logger.log(createCustomerDto);
    return await Promise.resolve();
  }
}
