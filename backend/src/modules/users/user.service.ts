import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import ICreateUserDTO from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({ relations: ['posts'] });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const [user] = await this.usersRepository.find({
      where: { email },
    });
    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const findUserByEmail = await this.findByEmail(data.email);
    if (findUserByEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'A user with this email already exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);

    return user;
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
  }
}
