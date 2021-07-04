import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookRoomCommand } from '@modules/agenda/commands/book-room.command';
import { RoomRepository } from '@modules/agenda/repositories/room.repository';
import { ApiException } from '@shared/models/api-exception.model';
import { Logger } from '@nestjs/common';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  private readonly logger = new Logger(BookRoomHandler.name);

  constructor(private readonly repository: RoomRepository) {}

  async execute(command: BookRoomCommand): Promise<void> {
    this.logger.log('BookRoomHandler.execute()');

    const room = await this.repository.isAvailable(
      command.roomId,
      command.date,
    );

    if (!room) {
      throw new ApiException(400, 'Sala não disponível');
    }

    await room.book(command.customer, command.date);
    await this.repository.book(room);
  }
}
