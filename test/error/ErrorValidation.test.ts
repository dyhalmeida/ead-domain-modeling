import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"

describe('ErrorValidation', () => {

    it('Should thow error', () => {
        expect(() => ErrorValidation._throw({ code: 'CUSTOM_ERROR', value: 'ANY_VALUE' })).toThrow('CUSTOM_ERROR')
    })

    it('Should create an error with code and value', () => {
        const error = new ErrorValidation({ code: Errors.INVALID_EMAIL, value: 'john.doe@' })
        expect(error.code).toBe(Errors.INVALID_EMAIL)
        expect(error.value).toBe('john.doe@')
    })

    it('Should create an error with code, value and extras values', () => {
        const error = new ErrorValidation({ code: Errors.INVALID_SIZE, value: 'John', extras: { min: 6 } })
        expect(error.code).toBe(Errors.INVALID_SIZE)
        expect(error.value).toBe('John')
        expect(error?.extras.min).toBe(6)
    })

    it('Should create or thow an error unknow', () => {
        expect(new ErrorValidation({}).code).toBe(Errors.UNKNOWN)
        expect(new ErrorValidation(undefined).code).toBe(Errors.UNKNOWN)
        expect(ErrorValidation.new({}).code).toBe(Errors.UNKNOWN)
        expect(() => ErrorValidation._throw({})).toThrow(Errors.UNKNOWN)
    })
})