import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //유저 조회
  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  //회원가입
  async createUser(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto;
    //이미 있는 지 확인
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      throw new HttpException('이미 존재하는 유저', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.save({
      ...rest,
      email,
      password: hashedPassword,
    });
  }
}
