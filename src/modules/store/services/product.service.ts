import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '@shared/models/api-exception.model';
import { Repository } from 'typeorm';
import { CreateProductDto } from '@modules/store/dtos/create-product.dto';
import { UpdateProductDto } from '@modules/store/dtos/update-product.dto';
import { Product } from '@modules/store/entities/product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new ApiException(404, `Produto não encontrado ${id}`);
    }

    return product;
  }

  async save(createProductDto: CreateProductDto): Promise<Product> {
    return await this.repository.save(createProductDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    await this.repository.update(id, updateProductDto);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
