import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/point-transaction';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser }) {
    // 1. pointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointTransactionRepository.save(pointTransaction);

    // 2. 유저 정보 찾아오기
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });

    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      { id: user.id },
      { point: user.point + amount },
    );

    // 4. 최종결과 프론트엔드에 돌려주기
    return pointTransaction;
  }
}
