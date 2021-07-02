import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from '@modules/store/dtos/create-product.dto';
import { UpdateProductDto } from '@modules/store/dtos/update-product.dto';
import { Product } from '@modules/store/entities/product.entity';
import { ProductService } from '@modules/store/services/product.service';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async list(): Promise<Product[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async get(@Param() id: string): Promise<Product> {
    return await this.service.findById(id);
  }

  @Post()
  async post(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.service.save(createProductDto);
  }

  @Put(':id')
  async put(
    @Param() id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    return await this.service.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<void> {
    return await this.service.delete(id);
  }
}
