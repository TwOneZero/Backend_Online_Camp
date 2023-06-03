import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/user-interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: string) {
    return this.userRepository.findOneBy({ id: id });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    // const { email, ...rest } = createUserDto;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPwd = await bcrypt.hash(password, 10);
    return this.userRepository.save({ email, password: hashedPwd, name, age });
  }
}
