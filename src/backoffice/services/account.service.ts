import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from 'src/shared/models/api-exception.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Criando usuário => ${JSON.stringify(createUserDto)}`);

    const alreadyExists = await this.userModel.exists({
      username: createUserDto.username,
    });

    if (alreadyExists) {
      throw new ApiException(
        400,
        `Já existe um cliente cadastrado com o CPF ${createUserDto.username}`,
      );
    }

    return await new this.userModel(createUserDto).save();
  }
}
