import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
