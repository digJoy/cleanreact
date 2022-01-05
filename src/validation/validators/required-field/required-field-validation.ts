import { FieldValidation } from "@/validation/protocols/field-validation";
import { RequiredFieldError } from "@/validation/errors";

// composite do tipo validation com todos os filhos com esse formato
export class RequiredFieldValidation implements FieldValidation {
    constructor (readonly field: string) {}

    validate(value: string): Error {
        //@ts-ignore
        return value ? null : new RequiredFieldError()
    }
}