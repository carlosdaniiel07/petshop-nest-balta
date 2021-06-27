import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { Pet } from './pet.model';
import { User } from './user.model';

@Schema()
export class Customer {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  document: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop([Pet])
  pets: Pet[];

  @Prop(Address)
  billingAddress: Address;

  @Prop(Address)
  shippingAddress: Address;

  @Prop(CreditCard)
  creditCard: CreditCard;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  user: User;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
