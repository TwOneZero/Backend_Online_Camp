import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsCategory } from './entities/productsCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductsCategory)
    private readonly productCategoryRepository: Repository<ProductsCategory>,
  ) {}
  async create({ name }) {
    const result = await this.productCategoryRepository.save({
      name,
    });
    console.log(result);
    return result;
  }
}
