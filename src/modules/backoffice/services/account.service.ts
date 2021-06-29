import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiException } from '@shared/models/api-exception.model';
import { CreateUserDto } from '@modules/backoffice/dto';
import { User } from '@modules/backoffice/models/user.model';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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
