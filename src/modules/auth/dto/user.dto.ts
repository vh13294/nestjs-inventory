import { IsInt, IsDateString, IsPositive, NotEquals } from 'class-validator';

export class UserDto {
  id: number;
  email: string;
}
