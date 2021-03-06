import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from '@shared/models/api-exception.model';
import {
  CreateCreditCardDto,
  CreateCustomerDto,
  QueryDto,
  UpdateCustomerDto,
} from '@modules/backoffice/dto';
import { Customer } from '@modules/backoffice/models/customer.model';
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

  async findById(id: string): Promise<Customer> {
    return await this.customerModel
      .findById(id)
      .populate('user', 'username')
      .exec();
  }

  async findAllWithPagination({
    skip = 0,
    take = 10,
  }: QueryDto): Promise<Customer[]> {
    return await this.customerModel
      .find(
        {},
        {},
        {
          skip,
          limit: take,
        },
      )
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

  async update(
    document: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      { document },
      {
        $set: {
          name: updateCustomerDto.name,
        },
      },
      { useFindAndModify: false },
    );
  }

  async saveCreditCard(
    document: string,
    createCreditCardDto: CreateCreditCardDto,
  ): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      {
        document,
      },
      {
        $set: {
          creditCard: createCreditCardDto,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
      },
    );
  }
}
