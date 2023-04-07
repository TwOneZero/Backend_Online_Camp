import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsCategory } from './entities/productsCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsCategory])],
  providers: [ProductCategoryResolver, ProductCategoryService],
})
export class ProductCategoryModule {}
