import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, trim: true, unique: true })
  username: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
