import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAddressDto,
  CreateCreditCardDto,
  CreateCustomerDto,
  CreatePetDto,
  UpdateCustomerDto,
  UpdatePetDto,
} from '@modules/backoffice/dto';
import { Customer } from '@modules/backoffice/models/customer.model';
import { CustomerService } from '@modules/backoffice/services/customer.service';
import { AddressService } from '@modules/backoffice/services/address.service';
import { PetService } from '@modules/backoffice/services/pet.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    private readonly petService: PetService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
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

  @Put(':document')
  async update(
    @Param('document') document: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    return await this.customerService.update(document, updateCustomerDto);
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
    return await this.petService.save(document, createPetDto);
  }

  @Put(':document/pets/:petId')
  async updatePet(
    @Param('document') document: string,
    @Param('petId') petId: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<void> {
    return await this.petService.update(document, petId, updatePetDto);
  }

  @Put(':document/credit-card')
  async saveCreditCard(
    @Param('document') document: string,
    @Body() createCreditCardDto: CreateCreditCardDto,
  ): Promise<void> {
    return await this.customerService.saveCreditCard(
      document,
      createCreditCardDto,
    );
  }
}
