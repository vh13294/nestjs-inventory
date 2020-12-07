import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthAccessGuard extends AuthGuard('jwt-access-token') {}
