import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PointTransactionService } from './point-transaction.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/auth/gql-auth.guard';
import { PointTransaction } from './entities/point-transaction';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/common/auth/gql-user-param.decorator';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.pointTransactionService.create({ impUid, amount, currentUser });
  }
}
