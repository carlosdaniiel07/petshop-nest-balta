import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '@modules/backoffice/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '@modules/backoffice/models/customer.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async saveBillingAddress(
    document: string,
    createAddressDto: CreateAddressDto,
  ): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      { document },
      {
        $set: {
          billingAddress: createAddressDto,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
      },
    );
  }

  async saveShippingAddress(
    document: string,
    createAddressDto: CreateAddressDto,
  ): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      { document },
      {
        $set: {
          shippingAddress: createAddressDto,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
      },
    );
  }
}
