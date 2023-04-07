import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';

@Module({
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
