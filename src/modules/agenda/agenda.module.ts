import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BookRoomHandler } from './commands/handlers/book-room.handler';
import { RoomRepository } from './repositories/room.repository';
import { RoomController } from './room.controller';
import { BookRoomService } from './services/book-room.service';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [RoomController],
  providers: [
    BookRoomService,
    RoomRepository,
    BookRoomHandler,
  ],
})
export class AgendaModule {}
