import { ProductService } from '@modules/store/services/product.service';
import { Injectable } from '@nestjs/common';
import { ProductArgs } from '../dtos/product-args.dto';
import { Product } from '../models/product.model';

@Injectable()
export class ReportService {
  constructor(private readonly productService: ProductService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(args: ProductArgs): Promise<Product[]> {
    const data = await this.productService.findAll();
    return data.map(
      ({ id, title, description, price, createdAt, deletedAt, updatedAt }) => ({
        id,
        title,
        description,
        price,
        createdAt,
        deletedAt,
        updatedAt,
      }),
    );
  }
}
