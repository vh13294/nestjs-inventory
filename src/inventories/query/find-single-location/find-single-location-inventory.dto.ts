import { IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindSingleLocationInventoryDto {
    @Transform(value => parseInt(value))
    @IsInt()
    @IsNotEmpty()
    locationId: number;

    @Transform(value => parseInt(value))
    @IsInt()
    @IsNotEmpty()
    productId: number;

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Transform(value => parseInt(value))
    @IsInt()
    @ApiPropertyOptional()
    pageNumber: number = 0;
}
