import { BadRequestException } from "@nestjs/common"
import { ValidateIf, ValidationOptions } from "class-validator";

export function parseIntWithThrow(input: string): number {
    const parsedInput = parseInt(input)
    if(isNaN(parsedInput)) {
        throw new BadRequestException('Invalid Integer')
    }
    return parsedInput
}

export function parseIntDefaultZero(input: string): number {
    const parsedInput = parseInt(input)
    if(isNaN(parsedInput)) {
        return 0
    }
    return parsedInput
}

export function SkipEmptyString(options?: ValidationOptions): PropertyDecorator {
    return function SkipEmptyStringDecorator(prototype: unknown, propertyKey: string | symbol): void {
        ValidateIf((obj): boolean => obj[propertyKey] !== '', options)(prototype, propertyKey);
    };
}