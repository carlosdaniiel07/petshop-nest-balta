import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers/customer.controller';
import { CustomerSchema } from './models/customer.model';
import { UserSchema } from './models/user.model';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [CustomerController],
  providers: [AccountService, CustomerService],
})
export class BackofficeModule {}
