import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/api/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductsTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  tag: string;

  @ManyToMany(() => Product, (products) => products.productsTags)
  @Field(() => [Product])
  products: Product[];
}
