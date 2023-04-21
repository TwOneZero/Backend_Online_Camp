import { InputType, Int, Field } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductsSalesLocationInput } from 'src/api/productsSalesLocation/dto/productsSalesLocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductsSalesLocationInput)
  productsSalesLocationInfo: ProductsSalesLocationInput;

  @Field(() => String)
  productsCategoryId: string;

  @Field(() => [String])
  productsTags: string[];
}
