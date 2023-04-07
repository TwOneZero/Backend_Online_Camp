import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Board } from '../entities/board.entity';

@InputType()
export class CreateBoardInput extends OmitType(
  Board,
  ['number'] as const,
  InputType, //InputType 이 아닌 ObjectType 을 가져올 경우 InputType 을 명시
) {}
