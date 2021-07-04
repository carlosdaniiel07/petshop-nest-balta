import { Injectable, Logger } from '@nestjs/common';
import { Room } from '@modules/agenda/models/room.model';

@Injectable()
export class RoomRepository {
  private readonly logger = new Logger(RoomRepository.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async isAvailable(id: string, date: Date): Promise<Room> {
    this.logger.log('RoomRepository.isAvailable()');
    return Promise.resolve(
      new Room('f860a8df-fd3d-4a70-9990-79e204dbc6d7', 'Sala 01'),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async book(room: Room): Promise<void> {
    this.logger.log('RoomRepository.book()');
    return Promise.resolve();
  }
}
