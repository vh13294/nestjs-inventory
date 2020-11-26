import { IsInt, IsPositive, Min } from 'class-validator';
import { IsOptional, parseIntParams } from 'src/helpers/utilities';
import { Transform } from 'class-transformer';

// any params come in are default as string
export class FindSingleLocationInventoryParams {
    @Transform(value => parseIntParams(value))
    @IsInt()
    @IsPositive()
    locationId: number;

    @Transform(value => parseIntParams(value))
    @IsInt()
    @IsPositive()
    productId: number;

    // todo if provide empty string, default value 0 will be ignored => ''
    @Transform(value => parseIntParams(value))
    @IsOptional()
    @IsInt()
    @Min(0)
    pageNumber = 0;
}