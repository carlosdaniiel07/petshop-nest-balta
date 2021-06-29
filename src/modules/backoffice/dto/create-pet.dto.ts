import { IsEnum, IsIn, IsNotEmpty } from 'class-validator';
import { PetKind } from '@modules/backoffice/enums/pet-kind.enum';

export class CreatePetDto {
  @IsNotEmpty()
  name: string;

  @IsIn(['M', 'F'])
  gender: string;

  @IsEnum(PetKind)
  kind: PetKind;
}
