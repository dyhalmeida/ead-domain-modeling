import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"

export class HashPassword {

    static readonly regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/

    constructor(readonly value?: string) {
        if (!value || !HashPassword.isValid(value)) {
            ErrorValidation._throw({
                code: Errors.INVALID_HASH_PASSWORD,
                value
            })
        }
    }

    static isValid(hash: string) {
        return HashPassword.regex.test(hash)
    }
}