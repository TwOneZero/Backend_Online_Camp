// import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductsCategory } from 'src/api/productsCategory/entities/productsCategory.entity';
import { ProductsSalesLocation } from 'src/api/productsSalesLocation/entities/productsSalesLocation.entity';
import { ProductsTag } from 'src/api/productsTag/entities/productsTag.entity';
import { User } from 'src/api/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
// @ObjectType()
export class Product {
  // @Field(() => Int, { description: 'product id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @JoinColumn()
  @OneToOne(() => ProductsSalesLocation)
  productsSalesLocation: ProductsSalesLocation;

  @ManyToOne(() => ProductsCategory)
  productsCategory: ProductsCategory;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => ProductsTag, (productsTags) => productsTags.products)
  @JoinTable({
    name: 'product_product_tags',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_tag_id', referencedColumnName: 'id' },
  })
  productsTags: ProductsTag[];
}
