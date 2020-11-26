import { IsInt, IsPositive, Min } from 'class-validator';
import { parseIntNoModification } from 'src/helpers/utilities';
import { Transform } from 'class-transformer';

// any params come in are default as string
export class FindSingleLocationInventoryParams {
    @Transform(value => parseInt(value))
    @IsInt()
    @IsPositive()
    locationId: number;

    @Transform(value => parseInt(value))
    @IsInt()
    @IsPositive()
    productId: number;

    @Transform(value => parseIntNoModification(value))
    @IsInt()
    @Min(0)
    pageNumber = 0;
}