import { AccountService } from '@modules/backoffice/services/account.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiException } from '@shared/models/api-exception.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.accountService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new ApiException(404, 'Usuário não encontrado ou senha incorreta');
    }

    return await this.jwtService.signAsync({
      sub: user.id,
    });
  }
}