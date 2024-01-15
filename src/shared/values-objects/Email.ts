import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"

export class Email {
    static readonly regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    readonly value: string

    constructor(value?: string) {
        this.value = value?.trim() ?? ''
        if (!Email.isValid(this.value)) {
            ErrorValidation._throw({
                code: Errors.INVALID_EMAIL,
                value: this.value
            })
        }
    }

    get user() {
        const [user] = this.value.split('@')
        return user
    }

    get domain() {
        const [_, domain] = this.value.split('@')
        return domain
    }

    static isValid(email: string) {
        return Email.regex.test(email)
    }
}