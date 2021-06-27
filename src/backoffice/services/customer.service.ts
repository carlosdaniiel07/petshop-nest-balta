import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from 'src/shared/models/api-exception.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../models/customer.model';
import { AccountService } from './account.service';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    private readonly accountService: AccountService,
  ) {}

  async save(createCustomerDto: CreateCustomerDto): Promise<void> {
    this.logger.log(`Criando cliente => ${JSON.stringify(createCustomerDto)}`);

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
}
