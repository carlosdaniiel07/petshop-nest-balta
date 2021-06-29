import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from 'src/shared/models/api-exception.model';
import { CreateAddressDto } from '../dto/create-address.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { Customer } from '../models/customer.model';
import { AccountService } from './account.service';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    private readonly accountService: AccountService,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerModel
      .find({}, 'name email document')
      .sort('name')
      .exec();
  }

  async findByDocument(document: string): Promise<Customer> {
    return await this.customerModel
      .findOne({
        document,
      })
      .populate('user', 'username')
      .exec();
  }

  async save(createCustomerDto: CreateCustomerDto): Promise<void> {
    const { document, email, name, password } = createCustomerDto;
    const emailAlreadyUsed = await this.customerModel.exists({ email });

    if (emailAlreadyUsed) {
      throw new ApiException(
        400,
        `O e-mail ${email} já foi utilizado por outro cliente`,
      );
    }

    const createdUser = await this.accountService.createUser({
      username: document,
      password,
    });

    await new this.customerModel({
      name,
      document,
      email,
      user: createdUser,
    }).save();
  }

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

  async addPet(document: string, createPetDto: CreatePetDto): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      {
        document,
      },
      {
        $push: {
          pets: createPetDto,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
        new: true,
      },
    );
  }

  async updatePet(
    document: string,
    petId: string,
    updatePetDto: UpdatePetDto,
  ): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      {
        document,
        'pets._id': petId,
      },
      {
        $set: {
          'pets.$': updatePetDto,
        },
      },
      {
        useFindAndModify: false,
      },
    );
  }
}
