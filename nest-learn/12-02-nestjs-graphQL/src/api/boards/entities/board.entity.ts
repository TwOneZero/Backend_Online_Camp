import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Board {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
