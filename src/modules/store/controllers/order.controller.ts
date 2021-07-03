import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from '@modules/store/dtos/create-order.dto';
import { Order } from '@modules/store/entities/order.entity';
import { OrderService } from '@modules/store/services/order.service';

@Controller('v1/orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  async list(): Promise<Order[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Order> {
    return await this.service.findById(id);
  }

  @Post()
  async post(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.service.save(createOrderDto);
  }
}
