import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocation } from '../productsSalesLocation/entities/productsSalesLocation.entity';
import { ProductsTag } from '../productsTag/entities/productsTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductsSalesLocation, ProductsTag]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
