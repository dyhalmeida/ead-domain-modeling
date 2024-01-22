import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"

export class Url {
    readonly value: string
    private readonly url: URL

    constructor(value?: string) {
        this.value = value ?? ''
        if (!Url.isValid(this.value)) {
            ErrorValidation._throw({ value: this.value, code: Errors.INVALID_URL  })
        }
        this.url = new URL(this.value)
    }

    get protocol() {
        return this.url.protocol
    }

    get domain() {
        return this.url.hostname
    }

    get path() {
        return this.url.pathname
    }

    get params() {
        const params = this.url.searchParams.toString().split('&')
        return params.reduce((obj, param) => {
            const [key, value] = param.split('=')
            return {
                ...obj,
                [key]: value
            }
        }, {} as Record<string, string>)
    }

    static isValid(value: string) {
        try {
            new URL(value)
            return true
        } catch {
            return false
        }
    }
}