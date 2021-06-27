import { Prop } from "@nestjs/mongoose";

export class CreditCard {
  @Prop({ required: true })
  holder: string;
  
  @Prop({ required: true })
  number: string;
  
  @Prop({ required: true })
  expiration: string;
}
