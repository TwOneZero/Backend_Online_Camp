import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsCategory } from './entities/productsCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Mutation(() => ProductsCategory)
  createProductCategory(@Args('name') name: string) {
    //db 카테고리 등록
    return this.productCategoryService.create({ name });
    //카테고리 명 리턴
  }
}
