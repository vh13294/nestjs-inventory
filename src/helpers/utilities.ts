import { ValidateIf, ValidationOptions } from "class-validator";

export function parseIntParams(input: string): any {
  const digitWithSign = /^[-+]?\d+$/
  // if not a valid integer(+/-) return without modification
  if (!digitWithSign.test(input))
    return input

  return parseInt(input, 10)
}

export function IsOptional(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((obj, value) => {
    return value !== null && value !== undefined && value !== '';
  }, options);
}