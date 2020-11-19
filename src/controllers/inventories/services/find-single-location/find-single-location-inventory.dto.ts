import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindSingleLocationInventoryDto {
    @Transform(value => parseInt(value))
    @IsInt()
    @IsNotEmpty()
    locationId: number;

    @Transform(value => parseInt(value))
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @Transform(value => parseInt(value))
    @IsInt()
    pageNumber = 0;
}
