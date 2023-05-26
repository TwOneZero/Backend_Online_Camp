import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly elasticSearchService: ElasticsearchService,
  ) {}

  // @Query(() => [Product], { name: 'products' })
  @Query(() => String)
  async findAll() {
    const result = await this.elasticSearchService.search({
      index: 'myproduct03',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));
    return result;
    //엘라스틱 서치 연습을 위해 주석
    // return this.productsService.findAll();
  }
  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    await this.elasticSearchService.create({
      id: 'myid',
      index: 'myproduct03',
      document: {
        ...createProductInput,
      },
    });

    //엘라스틱서치 연습을 위해 주석
    // return this.productsService.create(createProductInput);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    //판매여부확인
    this.productsService.checkIsSold(updateProductInput.id);
    //에러가 없다면 업데이트
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Boolean)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productsService.remove(id);
  }
}
