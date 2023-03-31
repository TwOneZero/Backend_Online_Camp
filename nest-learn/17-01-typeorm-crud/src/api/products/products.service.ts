import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const result = await this.productRepository.save({
      ...createProductInput,
    });
    return result;
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    return product;
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const prevProduct = await this.productRepository.findOneBy({ id });

    const result = await this.productRepository.save({
      //기존 product 데이터도 함께 리턴
      ...prevProduct,
      //update 할 data
      ...updateProductInput,
    });
    return result;
  }

  //판매완료 여부 체크
  async checkIsSold(id: string) {
    const product = await this.productRepository.findOneBy({
      id,
    });
    if (product.isSoldout) {
      throw new HttpException(
        '이미 판매가 완료된 상품입니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return;
  }

  //상품 삭제
  async remove(id: string) {
    //상품이 있는 지 확인
    const isProduct = await this.findOne(id);
    if (!isProduct) {
      throw new HttpException('해당 상품이 없습니다.', HttpStatus.NOT_FOUND);
    }
    //1. 실제 삭제
    // const result = await this.productRepository.delete({ id });
    // return result.affected ? true : false;
    //2. Soft delete -> boolean checking
    // await this.productRepository.update({ id }, { isDeleted: true });

    //3. Soft delete -> delete time checking ( deletedAt)
    //결론 typeorm 에서 제공하기 때문에 필요없음
    // await this.productRepository.update({ id }, { deletedAt: new Date() });

    //4. Typeorm 제공 -> softRemove (아이디로만 삭제 가능)
    // await this.productRepository.softRemove({ id });

    //5. Typeorm 제공 -> softDelete (다른 조건으로도 삭제 가능)
    const result = await this.productRepository.softDelete({ id });
    return result.affected ? true : false;
  }
}
