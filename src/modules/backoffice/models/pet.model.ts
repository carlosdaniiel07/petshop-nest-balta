import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PetKind } from '../enums/pet-kind.enum';

@Schema()
export class Pet extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['M', 'F'] })
  gender: string;

  @Prop({ type: String })
  kind: PetKind;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
