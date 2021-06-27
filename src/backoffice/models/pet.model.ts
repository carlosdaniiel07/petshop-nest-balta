import { PetKind } from '../enums/pet-kind.enum';

export interface Pet {
  name: string;
  gender: string;
  kind: PetKind;
}
