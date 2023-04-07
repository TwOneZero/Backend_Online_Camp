import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsSalesLocation } from '../productsSalesLocation/entities/productsSalesLocation.entity';
import { ProductsTag } from '../productsTag/entities/productsTag.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductsSalesLocation)
    private readonly productsSalesLocationRepository: Repository<ProductsSalesLocation>,
    @InjectRepository(ProductsTag)
    private readonly productsTagRepository: Repository<ProductsTag>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['productsSalesLocation', 'productsCategory', 'productsTags'],
    });
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productsSalesLocation', 'productsCategory', 'productsTags'],
    });
    return product;
  }

  async create(createProductInput: CreateProductInput) {
    //1.상품만 등록
    // const result = await this.productRepository.save({
    //   ...createProductInput,
    // });
    //2. 상품 , 상품 거래 위치도 등록
    const {
      productsSalesLocationInfo,
      productsCategoryId,
      productsTags,
      ...product
    } = createProductInput;

    //위치 저장
    const resultLocationSave = await this.productsSalesLocationRepository.save({
      ...productsSalesLocationInfo,
    });

    //태그 가져오기 ( 비효율적 방법  : for 문)
    const tagSaveResult = [];
    for (let i = 0; i < productsTags.length; i++) {
      const tagName = productsTags[i].replace('#', '');

      //태그명이 존재하는 지 확인
      const prevTag = await this.productsTagRepository.findOne({
        where: { tag: tagName },
      });
      //태그가 있다면
      if (prevTag) {
        tagSaveResult.push(prevTag);
      } else {
        //태그가 없다면
        //Tag 테이블에 저장
        const newTag = await this.productsTagRepository.save({
          tag: tagName,
        });
        tagSaveResult.push(newTag);
      }
    }

    //상품 저장 & 카테고리 & 태그 저장
    const resultProductSave = await this.productRepository.save({
      ...product,
      //객체 전체를 save 함으로써 return 시 모든 데이터 반환 가능
      productsSalesLocation: resultLocationSave,
      productsCategory: {
        id: productsCategoryId,
      },
      productsTags: tagSaveResult,
    });

    return resultProductSave;
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    const prevProduct = await this.productRepository.findOneBy({ id });
    const { productsTags, ...rest } = updateProductInput;

    //태그 정보 가져오기
    const tagSaveResult: ProductsTag[] = [];
    for (let i = 0; i < productsTags.length; i++) {
      const tagName = productsTags[i].replace('#', '');

      //태그명이 존재하는 지 확인
      const prevTag = await this.productsTagRepository.findOne({
        where: { tag: tagName },
      });
      //태그가 있다면
      if (prevTag) {
        tagSaveResult.push(prevTag);
      } else {
        //태그가 없다면
        //Tag 테이블에 저장
        const newTag = await this.productsTagRepository.save({
          tag: tagName,
        });
        tagSaveResult.push(newTag);
      }
    }

    const result = await this.productRepository.save({
      //기존 product 데이터도 함께 리턴
      ...prevProduct,
      //update 할 data
      ...rest,
      productsTags: tagSaveResult,
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
