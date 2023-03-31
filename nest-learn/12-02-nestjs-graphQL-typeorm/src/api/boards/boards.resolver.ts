import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { UpdateBoardInput } from './dto/update-board.input';

@Resolver(() => Board)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => String)
  getHello() {
    return this.boardsService.hello();
  }

  @Mutation(() => Board)
  createBoard(@Args('createBoardInput') createBoardInput: CreateBoardInput) {
    return this.boardsService.create(createBoardInput);
  }

  @Query(() => [Board], { name: 'boards' })
  findAll() {
    return this.boardsService.findAll();
  }

  // @Query(() => Board, { name: 'board' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.boardsService.findOne(id);
  // }

  // @Mutation(() => Board)
  // updateBoard(@Args('updateBoardInput') updateBoardInput: UpdateBoardInput) {
  //   return this.boardsService.update(updateBoardInput.id, updateBoardInput);
  // }

  // @Mutation(() => Board)
  // removeBoard(@Args('id', { type: () => Int }) id: number) {
  //   return this.boardsService.remove(id);
  // }
}
