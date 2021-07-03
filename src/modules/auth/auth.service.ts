import { AccountService } from '@modules/backoffice/services/account.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiException } from '@shared/models/api-exception.model';
import { JwtPayload } from '@modules/auth/models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.accountService.findByUsername(username);

    if (!user || user.password !== password) {
      throw new ApiException(401, 'Usuário não encontrado ou senha incorreta');
    }

    if (!user.active) {
      throw new ApiException(401, 'Usuário bloqueado')
    }

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload);
  }
}
