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
    await queryRunner.startTransaction();

    try {
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      const user = await queryRunner.manager.findOneBy(User, { id: _user.id });

      //객체를 생성해서 업데이트 될 내용을 담는다.
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    // //1. point-transaction table 에 거래기록 저장
    // const pointTransaction = this.pointsTransactionsRepository.create({
    //   impUid,
    //   amount,
    //   user: _user,
    //   status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    // });
    // await this.pointsTransactionsRepository.save(pointTransaction);

    // //2. user point 조회
    // const user = await this.usersRepository.findOneBy({ id: _user.id });
    // //3. user point 추가(update)
    // await this.usersRepository.update(
    //   { id: _user.id },
    //   { point: user.point + amount },
    // );

    //4. 브라우저에 response
  }
}
