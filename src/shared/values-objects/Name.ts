import { Errors } from "@/constants/errors.constants"
import { Validator } from "@/utils/Validator"

export class Name {

    readonly name: string

    constructor(name: string){
        this.name = name.trim()
        const errors = Validator.mergeErrors(
            Validator.isEmpty({ value: this.name, errorMessage: Errors.EMPTY_NAME }),
            Validator.isSmallerThan({ value: this.name, size: 4, errorMessage: Errors.SMALL_NAME }),
            Validator.isBiggerThan({ value: this.name, size: 120, errorMessage: Errors.BIG_NAME }),
            Validator.isEmpty({ value: this.name.split(' ')[1], errorMessage: Errors.NAME_WITHOUT_LAST_NAME }),
            Validator.isValidRegex({ value: this.name, regex: /^[a-zA-ZÀ-ú\s]+$/, errorMessage: Errors.NAME_WITH_INVALID_CHARACTERS })
        )
        if (errors !== null) throw errors
    }

    get fullname() {
        return this.name
    }

    get firstname() {
        const [fistname] = this.name.split(' ')
        return fistname
    }

    get surnames() {
        return this.name.split(' ').slice(1).join(' ')
    }

    get lastname() {
        return this.name.split(' ').pop()
    }

}
