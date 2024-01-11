import { ErrorValidation } from "@/error/ErrorValidation";

export class Validator {

    static isNull({ value, errorMessage }: { value: any, errorMessage: string }): ErrorValidation | null {
        if (value === null || value === undefined) {
            return ErrorValidation.new({ code: errorMessage, value })
        }
        return null
    }

    static isEmpty({ value, errorMessage }: { value?: string | null, errorMessage: string}): ErrorValidation | null {
        if (Validator.isNull({ value, errorMessage })?.code) {
            return ErrorValidation.new({ code: errorMessage, value })
        }
        if (value!.trim() === '') return ErrorValidation.new({ code: errorMessage, value })
        return null
    }

    static isSmallerThan({ value, size, errorMessage }: { value: string | any[], size: number, errorMessage: string}): ErrorValidation | null {
        if (value.length < size) return null
        return ErrorValidation.new({ code: errorMessage, value, extras: { max: size } })
    }

    static isBiggerThan({ value, size, errorMessage }: { value: string | any[], size: number, errorMessage: string}): ErrorValidation | null {
        if (value.length > size) return null
        return ErrorValidation.new({ code: errorMessage, value, extras: { min: size } })
    }

    static isValidRegex({ value, regex, errorMessage }: { value: string, regex: RegExp, errorMessage: string }): ErrorValidation | null {
        if (regex.test(value)) return null
        return ErrorValidation.new({ code: errorMessage, value })
    }

    static mergeErrors(...errors: (ErrorValidation | null)[]): ErrorValidation[] | null {
        const filtered = errors.filter((error) => error !== null)
        if (filtered.length > 0) return filtered as ErrorValidation[]
        return null
    }

}