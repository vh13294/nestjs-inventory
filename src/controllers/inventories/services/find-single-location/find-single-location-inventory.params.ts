import { IsNumberString } from 'class-validator';
import { SkipEmptyString } from 'src/helpers/utilities';

// any params come in are default as string
export class FindSingleLocationInventoryParams {
    @IsNumberString()
    locationId: string;

    @IsNumberString()
    productId: string;

    @SkipEmptyString()
    @IsNumberString()
    pageNumber?: string;
}