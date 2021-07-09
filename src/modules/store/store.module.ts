import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@modules/store/entities/product.entity';
import { ProductController } from '@modules/store/controllers/product.controller';
import { ProductService } from '@modules/store/services/product.service';
import { Order } from '@modules/store/entities/order.entity';
import { OrderItem } from '@modules/store/entities/order-item.entity';
import { OrderController } from '@modules/store/controllers/order.controller';
import { OrderService } from '@modules/store/services/order.service';
import { BackofficeModule } from '@modules/backoffice/backoffice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.99.100',
      port: 3306,
      username: 'petshop',
      password: 'petshop',
      database: 'petshop_balta',
      synchronize: true,
      logging: ['query'],
      entities: [Product, Order, OrderItem],
    }),
    TypeOrmModule.forFeature([Product, Order]),
    BackofficeModule,
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService],
  exports: [ProductService],
})
export class StoreModule {}
