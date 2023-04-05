import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

//GraphQL 스타일로 authguard getRequest 오버라이딩
export class GqlAuthGuard extends AuthGuard('myGuard') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
