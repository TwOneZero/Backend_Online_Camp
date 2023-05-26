import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSalesLocation } from '../productsSalesLocation/entities/productsSalesLocation.entity';
import { ProductsTag } from '../productsTag/entities/productsTag.entity';
import { ProductSubscriber } from './entities/product.subscriber';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductsSalesLocation, ProductsTag]),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [ProductsResolver, ProductsService, ProductSubscriber],
})
export class ProductsModule {}
