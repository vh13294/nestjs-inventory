import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard('jwt-refresh-token') {}
