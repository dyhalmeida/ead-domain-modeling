import { Errors } from '@/constants/errors.constants'
import { v4 as uuid, validate } from 'uuid'

export class Id {

    readonly value: string
    readonly isNew: boolean

    constructor(value?: string) {
        this.value = value ?? uuid()
        this.isNew = !value

        if(!validate(this.value)) throw new Error(Errors.INVALID_ID)
    }

    static get new() {
        return new Id()
    }

    isEqual(id: Id) {
        return this.value === id?.value
    }

    isDifferent(id: Id) {
        return this.value !== id?.value
    }
}