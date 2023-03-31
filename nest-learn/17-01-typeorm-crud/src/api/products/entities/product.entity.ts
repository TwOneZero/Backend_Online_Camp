// import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductsCategory } from 'src/api/productsCategory/entities/productsCategory.entity';
import { ProductsSalesLocation } from 'src/api/productsSalesLocation/entities/productsSalesLocation.entity';
import { ProductsTag } from 'src/api/productsTag/entities/productsTag.entity';
import { User } from 'src/api/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  // @Column({ default: false })
  // @Field(() => Boolean)
  // isDeleted: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductsSalesLocation)
  @Field(() => ProductsSalesLocation)
  productsSalesLocation: ProductsSalesLocation;

  @ManyToOne(() => ProductsCategory)
  @Field(() => ProductsCategory)
  productsCategory: ProductsCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToMany(() => ProductsTag, (productsTags) => productsTags.products, {
    cascade: ['update'],
  })
  @JoinTable({
    name: 'product_product_tags',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_tag_id', referencedColumnName: 'id' },
  })
  @Field(() => [ProductsTag])
  productsTags: ProductsTag[];
}
