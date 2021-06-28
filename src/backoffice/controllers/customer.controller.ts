import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  async save(@Body() createCustomerDto: CreateCustomerDto): Promise<void> {
    return await this.service.save(createCustomerDto);
  }

  @Post(':document/addresses/billing')
  async saveBillingAddress(
    @Param('document') document: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<void> {
    return await this.service.saveBillingAddress(document, createAddressDto);
  }

  @Post(':document/addresses/shipping')
  async saveShippingAddress(
    @Param('document') document: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<void> {
    return await this.service.saveShippingAddress(document, createAddressDto);
  }
}
