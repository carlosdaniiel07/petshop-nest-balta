import { Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Room extends AggregateRoot {
  private readonly logger = new Logger(Room.name);

  constructor(
    private readonly id: string,
    private readonly description: string,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async book(customer: string, date: Date): Promise<void> {
    this.logger.log('Room.book()');
    return Promise.resolve();
  }
}
