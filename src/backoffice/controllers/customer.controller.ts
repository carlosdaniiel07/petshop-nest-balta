import { Controller } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}
}
