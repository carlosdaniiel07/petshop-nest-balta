import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { BookRoomCommand } from './commands/book-room.command';
import { BookRoomDto } from './dtos/book-room.dto';
import { BookRoomService } from './services/book-room.service';

@Controller('v1/rooms')
export class RoomController {
  private readonly logger = new Logger(RoomController.name);

  constructor(private readonly service: BookRoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async book(
    @Req() request: any,
    @Body() bookRommDto: BookRoomDto,
  ): Promise<void> {
    this.logger.log('RoomController.book()');

    const command = new BookRoomCommand(
      request.user.id,
      bookRommDto.room,
      bookRommDto.date,
    );
    await this.service.Book(command);
  }
}
