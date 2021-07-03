import { IsNotEmpty, Length } from "class-validator";

export class LoginDto {
  @Length(11)
  username: string

  @IsNotEmpty()
  password: string
}