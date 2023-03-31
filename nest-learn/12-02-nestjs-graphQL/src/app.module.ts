import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardsModule } from './api/boards/boards.module';
import { ProductsModule } from './api/products/products.module';
@Module({
  imports: [
    //Nestjs-graphQL Setting
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //스키마 파일을 자동으로 생성해줌
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    BoardsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
