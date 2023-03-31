import { Product } from 'src/api/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tag: string;

  @ManyToMany(() => Product, (products) => products.productsTags)
  products: Product[];
}
