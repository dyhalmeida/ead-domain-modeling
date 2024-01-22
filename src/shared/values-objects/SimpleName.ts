import { Errors } from "@/constants/errors.constants"
import { Validator } from "@/utils/Validator"

interface ISimpleNameProps {
    value: string
    min: number
    max: number
}

export class SimpleName {
    readonly value: string

    constructor({ value, min, max }: ISimpleNameProps) {
        this.value = value?.trim() ?? ''
        const errors = Validator.mergeErrors(
            Validator.isEmpty({ value: this.value, errorMessage: Errors.EMPTY_NAME }),
            Validator.isBiggerThanOrEqual({ value: this.value, size: max, errorMessage: Errors.BIG_NAME }),
            Validator.isSmallerThanOrEqual({ value: this.value, size: min, errorMessage: Errors.SMALL_NAME })
        )

        if (errors) throw errors
    }

    get fullname() {
        return this.value
    }
}