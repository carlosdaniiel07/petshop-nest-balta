import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { CustomerService } from '../services/customer.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  async save(@Body() createCustomerDto: CreateCustomerDto): Promise<void> {
    return await this.service.save(createCustomerDto);
  }

  @Put(':document/addresses/billing')
  async saveBillingAddress(
    @Param('document') document: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<void> {
    return await this.service.saveBillingAddress(document, createAddressDto);
  }

  @Put(':document/addresses/shipping')
  async saveShippingAddress(
    @Param('document') document: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<void> {
    return await this.service.saveShippingAddress(document, createAddressDto);
  }

  @Post(':document/pets')
  async savePet(
    @Param('document') document: string,
    @Body() createPetDto: CreatePetDto,
  ): Promise<void> {
    return await this.service.addPet(document, createPetDto);
  }

  @Put(':document/pets/:petId')
  async updatePet(
    @Param('document') document: string,
    @Param('petId') petId: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<void> {
    return await this.service.updatePet(document, petId, updatePetDto);
  }
}
