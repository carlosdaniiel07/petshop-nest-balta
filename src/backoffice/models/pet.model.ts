import { Prop } from '@nestjs/mongoose';
import { PetKind } from '../enums/pet-kind.enum';

export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['M', 'F'] })
  gender: string;

  @Prop({ type: String })
  kind: PetKind;
}
