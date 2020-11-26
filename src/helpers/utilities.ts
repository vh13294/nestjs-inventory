import { ValidateIf, ValidationOptions } from "class-validator";

export function parseIntNoModification(input: string): any {
    const parsedInput = parseInt(input)
    if (isNaN(parsedInput)) {
        // new ValidationPipe({
        //     skipNullProperties: true,
        //     skipMissingProperties: true,
        //     skipUndefinedProperties: true,
        //   }),
        if (input === '') return null // avoid validation
        return input
    }
    return parsedInput
}

export function SkipEmptyString(options?: ValidationOptions): PropertyDecorator {
    return function SkipEmptyStringDecorator(prototype: unknown, propertyKey: string | symbol): void {
        ValidateIf((obj): boolean => obj[propertyKey] !== '', options)(prototype, propertyKey);
    };
}