import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '@shared/models/api-exception.model';
import { Repository } from 'typeorm';
import { Order } from '@modules/store/entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderItem } from '../entities/order-item.entity';
import { ProductService } from './product.service';
import { CustomerService } from '@modules/backoffice/services/customer.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
    private readonly productService: ProductService,
    private readonly customerService: CustomerService,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repository.findOne(id);

    if (!order) {
      throw new ApiException(404, `Pedido não encontrado ${id}`);
    }

    return order;
  }

  async findByNumber(number: string): Promise<Order> {
    return await this.repository.findOne({ where: { number } });
  }

  async save(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderItems: OrderItem[] = [];
    const customer = await this.customerService.findByDocument(createOrderDto.customer)

    if (!customer) {
      throw new ApiException(404, `Cliente ${createOrderDto.customer} não encontrado`)
    }

    for (const createOrderItemDto of createOrderDto.items) {
      const product = await this.productService.findById(
        createOrderItemDto.product,
      );
      orderItems.push({
        product,
        price: product.price,
        quantity: createOrderItemDto.quantity,
      });
    }

    return await this.repository.save({
      number: Date.now()
        .toString()
        .substring(0, 7),
      customer: createOrderDto.customer,
      items: orderItems,
    });
  }
}
