import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"

export class StrongPassword {
    static readonly regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,256})/

    constructor(readonly value?: string) {
        if (value === null || value === undefined || value === '') {
            ErrorValidation._throw({
                code: Errors.PASSWORD_NOT_PROVIDED,
                value
            })
        }
        if(!StrongPassword.isValid(value)) {
            ErrorValidation._throw({
                code: Errors.WEAK_PASSWORD,
                value
            })
        }
    }

    static isValid(password: string) {
        return this.regex.test(password)
    }
}