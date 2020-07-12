import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateInventoryDto {
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsDateString()
    date: Date;

    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    locationId: number;

    @IsInt()
    @IsNotEmpty()
    productId: number;
}
