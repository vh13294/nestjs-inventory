import { IsInt, IsDateString } from 'class-validator';

export class CreateInventoryDto {
    @IsInt()
    quantity: number;

    @IsDateString()
    date: Date;

    @IsInt()
    userId: number;

    @IsInt()
    locationId: number;

    @IsInt()
    productId: number;
}
