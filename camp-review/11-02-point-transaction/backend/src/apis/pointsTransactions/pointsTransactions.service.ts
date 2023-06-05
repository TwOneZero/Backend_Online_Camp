import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    // await queryRunner.startTransaction(); //MySQL에서의 기본은 **Repeatable-Read**
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      // const user = await queryRunner.manager.findOneBy(User, { id: _user.id });
      // query 도중 읽기쓰기 모두 금지
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' }, // write_or_fail: 잠겼으면 관두기, partial_write: 잠긴것 패스하고 나머지 수행, for~~: postgres 전용
      });

      //객체를 생성해서 업데이트 될 내용을 담는다.
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      //TypeORM 에서 제공하는 increment 를 이용해서 조회/저장을 한번에 가능(숫자 데이터 변경에서만 가능)
      // const id = _user.id;
      // await queryRunner.manager.increment(User, { id }, 'point', amount);

      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
