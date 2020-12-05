import { IsInt, IsDateString, IsPositive, NotEquals } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  @NotEquals(0)
  quantity: number;

  @IsDateString()
  date: string;

  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  locationId: number;

  @IsInt()
  @IsPositive()
  productId: number;
}
