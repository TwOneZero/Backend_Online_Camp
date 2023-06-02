import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
