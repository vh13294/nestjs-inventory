import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class CreateInventoryDto {
    @IsInt()
    @IsNotEmpty()
    quantity: number;

    @IsDate()
    date: Date;
}
