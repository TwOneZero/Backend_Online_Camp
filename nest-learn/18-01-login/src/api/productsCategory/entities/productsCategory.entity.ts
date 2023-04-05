import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductsCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  //카테고리명은 유일해야 함
  @Column({ unique: true })
  @Field(() => String)
  name: string;
}
