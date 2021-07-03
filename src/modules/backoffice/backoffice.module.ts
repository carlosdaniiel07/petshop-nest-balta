import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from '@modules/backoffice/controllers/customer.controller';
import { CustomerSchema } from '@modules/backoffice/models/customer.model';
import { UserSchema } from '@modules/backoffice/models/user.model';
import { AccountService } from '@modules/backoffice/services/account.service';
import { CustomerService } from '@modules/backoffice/services/customer.service';
import { AddressService } from '@modules/backoffice/services/address.service';
import { PetService } from '@modules/backoffice/services/pet.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.99.100/curso_nest_balta'),
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
  providers: [AccountService, CustomerService, AddressService, PetService],
  exports: [CustomerService],
})
export class BackofficeModule {}
