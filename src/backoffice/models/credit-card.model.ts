import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CreditCard {
  @Prop({ required: true })
  holder: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  expiration: string;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
