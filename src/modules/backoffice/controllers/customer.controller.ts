import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateAddressDto,
  CreateCustomerDto,
  CreatePetDto,
  UpdatePetDto,
} from '@modules/backoffice/dto';
import { Customer } from '@modules/backoffice/models/customer.model';
import { CustomerService } from '@modules/backoffice/services/customer.service';
import { AddressService } from '../services/address.service';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  async list(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Get('search')
  async search(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ): Promise<Customer[]> {
    return await this.customerService.findAllWithPagination({ skip, take });
  }

  @Get(':document/details')
  async getDetails(@Param('document') document: string): Promise<Customer> {
    return await this.customerService.findByDocument(document);
  }

  @Post()
  async save(@Body() createCustomerDto: CreateCustomerDto): Promise<void> {
    return await this.customerService.save(createCustomerDto);
  }

  @Put(':document/addresses/billing')
  async saveBillingAddress(
    @Param('document') document: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<void> {
    return await this.addressService.saveBillingAddress(
      document,
      createAddressDto,
    );
  }

  @Put(':document/addresses/shipping')
  async saveShippingAddress(
    @Param('document') document: string,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<void> {
    return await this.addressService.saveShippingAddress(
      document,
      createAddressDto,
    );
  }

  @Post(':document/pets')
  async savePet(
    @Param('document') document: string,
    @Body() createPetDto: CreatePetDto,
  ): Promise<void> {
    return await this.customerService.addPet(document, createPetDto);
  }

  @Put(':document/pets/:petId')
  async updatePet(
    @Param('document') document: string,
    @Param('petId') petId: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<void> {
    return await this.customerService.updatePet(document, petId, updatePetDto);
  }
}
