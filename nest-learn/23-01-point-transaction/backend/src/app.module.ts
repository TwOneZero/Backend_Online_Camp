import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './api/boards/boards.module';
import { Board } from './api/boards/entities/board.entity';
import { Product } from './api/products/entities/product.entity';
import { ProductsModule } from './api/products/products.module';
import { ProductsCategory } from './api/productsCategory/entities/productsCategory.entity';
import { ProductCategoryModule } from './api/productsCategory/productCategory.module';
import { ProductsSalesLocation } from './api/productsSalesLocation/entities/productsSalesLocation.entity';
import { ProductsTag } from './api/productsTag/entities/productsTag.entity';
import { User } from './api/users/entities/user.entity';
import { UserModule } from './api/users/user.module';
import { AuthModule } from './api/auth/auth.module';
import { PointTransactionModule } from './api/point-transaction/point-transaction.module';

@Module({
  imports: [
    //Nestjs-graphQL Setting
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //스키마 파일을 자동으로 생성해줌
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestproject03',
      entities: [
        Board,
        Product,
        ProductsCategory,
        ProductsSalesLocation,
        ProductsTag,
        User,
      ],
      //객체의 내용과 db 를 동기화함
      synchronize: true,
      //back -> db ( orm 실행을 쿼리로 로깅해줌)
      logging: true,
    }),
    BoardsModule,
    ProductsModule,
    ProductCategoryModule,
    UserModule,
    AuthModule,
    PointTransactionModule,
  ],
})
export class AppModule {}
