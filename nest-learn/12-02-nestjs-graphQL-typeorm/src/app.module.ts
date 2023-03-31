import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './api/boards/boards.module';
import { Board } from './api/boards/entities/board.entity';
import { ProductsModule } from './api/products/products.module';
@Module({
  imports: [
    //Nestjs-graphQL Setting
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //스키마 파일을 자동으로 생성해줌
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestproject03',
      entities: [Board],
      //객체의 내용과 db 를 동기화함
      synchronize: true,
      //back -> db ( orm 실행을 쿼리로 로깅해줌)
      logging: true,
    }),
    BoardsModule,
    ProductsModule,
  ],
})
export class AppModule {}
