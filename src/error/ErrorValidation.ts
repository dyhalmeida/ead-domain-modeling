import { Errors } from "@/constants/errors.constants"

export interface ErrorValidationProps {
    code?: string
    value?: any
    extras?: any
}

export class ErrorValidation extends Error {
    readonly code?: string
    readonly value?: any
    readonly extras?: any

    constructor(readonly props?: ErrorValidationProps) {
        super(props?.code ?? Errors.UNKNOWN)
        this.code = props?.code ?? Errors.UNKNOWN
        this.value = props?.value
        this.extras = props?.extras ?? {}
    }

    static new(props: ErrorValidationProps) {
        return new ErrorValidation(props)
    }

    static _throw(props: ErrorValidationProps): never {
        throw new ErrorValidation(props)
    }
    
}