import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/point-transaction';
import { User } from '../users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // 1. pointTransaction 테이블에 거래기록 1줄 생성
    try {
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      //쿼리러너를 통해 저장하기
      await queryRunner.manager.save(pointTransaction);
      // await this.pointTransactionRepository.save(pointTransaction);

      // 2. 유저 정보 찾아오기
      // const user = await this.userRepository.findOne({
      //   where: { id: currentUser.id },
      // });
      // -> serializable 적용, 조회 동안 읽기/쓰기 금지 (배타 락)
      const user = await queryRunner.manager.findOne(User, {
        where: { id: currentUser.id },
        lock: { mode: 'pessimistic_write' },
      });

      // 3. 유저의 돈 업데이트
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      // await this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );

      // 커밋성공
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }
}
