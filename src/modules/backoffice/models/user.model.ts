import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, trim: true, unique: true })
  username: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
