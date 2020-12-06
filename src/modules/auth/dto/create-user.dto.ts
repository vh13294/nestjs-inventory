import { IsInt, IsDateString, IsPositive, NotEquals } from 'class-validator';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  apiToken: string;
}
