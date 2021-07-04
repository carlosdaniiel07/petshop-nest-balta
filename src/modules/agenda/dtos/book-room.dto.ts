import { IsDateString, IsUUID } from 'class-validator';

export class BookRoomDto {
  @IsUUID()
  room: string;

  @IsDateString()
  date: Date;
}
