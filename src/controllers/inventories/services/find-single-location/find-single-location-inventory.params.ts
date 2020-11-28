import { IsInt, IsPositive, Min } from 'class-validator';
import { parseIntParams } from 'src/helpers/utilities';
import { Transform } from 'class-transformer';

// any params come in are default as string
export class FindSingleLocationInventoryParams {
  @Transform((value) => parseIntParams(value))
  @IsInt()
  @IsPositive()
  locationId: number;

  @Transform((value) => parseIntParams(value))
  @IsInt()
  @IsPositive()
  productId: number;

  // enforce it in front-end, don't send empty string,
  // send [null,undefined] will be discarded by axios
  @Transform((value) => parseIntParams(value))
  @IsInt()
  @Min(0)
  pageNumber = 0;
}
