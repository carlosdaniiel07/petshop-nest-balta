import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Address, AddressSchema } from './address.model';
import { CreditCard, CreditCardSchema } from './credit-card.model';
import { Pet, PetSchema } from './pet.model';
import { User } from './user.model';

@Schema()
export class Customer {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  document: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop([{ type: PetSchema }])
  pets: Pet[];

  @Prop({ type: AddressSchema })
  billingAddress: Address;

  @Prop({ type: AddressSchema })
  shippingAddress: Address;

  @Prop({ type: CreditCardSchema })
  creditCard: CreditCard;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  user: User;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
