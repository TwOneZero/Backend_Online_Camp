import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserDto extends OmitType(
  User,
  ['id', 'point'] as const,
  InputType,
) {
  @Field(() => String)
  password: string;
}
