import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from '../commands/book-room.command';

@Injectable()
export class BookRoomService {
  private readonly logger = new Logger(BookRoomService.name);

  constructor(private readonly commandBus: CommandBus) {}

  async Book(command: BookRoomCommand): Promise<void> {
    this.logger.log('BookRoomService.Book()');
    await this.commandBus.execute(command);
  }
}
