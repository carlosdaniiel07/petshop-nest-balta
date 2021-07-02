import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@modules/store/entities/product.entity';
import { ProductController } from '@modules/store/controllers/product.controller';
import { ProductService } from '@modules/store/services/product.service';

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
      entities: [Product],
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class StoreModule {}
