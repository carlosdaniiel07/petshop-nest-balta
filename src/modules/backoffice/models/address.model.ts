import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop()
  zipCode: string;

  @Prop()
  street: string;

  @Prop()
  number: string;

  @Prop()
  complement: string;

  @Prop()
  neighborhood: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
