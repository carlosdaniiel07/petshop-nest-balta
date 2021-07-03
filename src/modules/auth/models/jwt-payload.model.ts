import { UserRole } from '@modules/backoffice/enums/user-role.enum';

export interface JwtPayload {
  sub: string;
  role: UserRole;
}
