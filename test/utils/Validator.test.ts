import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"
import { Validator } from "@/utils/Validator"

describe('Validator', () => {

    it('Should return null if the value is not null or undefined or empty', () => {
        const error = Validator.isNull({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeNull()
    })

    it('Should return an instance of ErrorValidation if the value is null or undefined', () => {
        const error = Validator.isNull({ value: null, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should return an instance of ErrorValidation if the value is empty string', () => {
        const error = Validator.isEmpty({ value: '    ', errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should return an instance of ErrorValidation if the value is null', () => {
        const error = Validator.isEmpty({ value: null, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should return an instance of ErrorValidation if the value is undefined', () => {
        const error = Validator.isEmpty({ value: undefined, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should return null if the value length is smaller than size', () => {
        const error = Validator.isSmallerThan({ value: 'ANY_TEXT_OR_TEXT', size: 10, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeNull()
    })

    it('Should return an instance of ErrorValidation if the value length is smaller than size', () => {
        const error = Validator.isSmallerThan({ value: 'ANY_TEXT', size: 10, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should return null if the value length is not bigger than size', () => {
        const error = Validator.isBiggerThan({ value: 'ANY_TEXT', size: 10, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeNull()
    })

    it('Should return an instance of ErrorValidation if the value length is bigger than size', () => {
        const error = Validator.isBiggerThan({ value: 'ANY_TEXT_OR_TEXT', size: 10, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should validate via regex that the value only contains numbers', () => {
        const error = Validator.isValidRegex({ value: '123456789', regex: /\d{9}/, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeNull()
    })

    it('Should return an instance of ErrorValidation if validate via regex that the value contains numbers and letters', () => {
        const error = Validator.isValidRegex({ value: '123A456B789', regex: /\d{9}/, errorMessage: 'ANY_ERROR_MESSAGE' })
        expect(error).toBeInstanceOf(ErrorValidation)
        expect(error?.code).toBe('ANY_ERROR_MESSAGE')
    })

    it('Should combine the errors', () => {
        const errors = Validator.mergeErrors(
            Validator.isEmpty({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE_1' }),
            Validator.isEmpty({ value: '   ', errorMessage: 'ANY_ERROR_MESSAGE_2' }),
            Validator.isEmpty({ value: '', errorMessage: 'ANY_ERROR_MESSAGE_3' }),
            Validator.isEmpty({ value: null, errorMessage: 'ANY_ERROR_MESSAGE_4' }),
            Validator.isEmpty({ value: undefined, errorMessage: 'ANY_ERROR_MESSAGE_5' }),
        )
        expect(errors?.map((error) => error.code).join(', '))
            .toBe('ANY_ERROR_MESSAGE_2, ANY_ERROR_MESSAGE_3, ANY_ERROR_MESSAGE_4, ANY_ERROR_MESSAGE_5')
    })

    it('Should combine the without errors', () => {
        const errors = Validator.mergeErrors(
            Validator.isEmpty({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE_1' }),
            Validator.isEmpty({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE_2' }),
            Validator.isEmpty({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE_3' }),
            Validator.isEmpty({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE_4' }),
            Validator.isEmpty({ value: 'ANY_TEXT', errorMessage: 'ANY_ERROR_MESSAGE_5' }),
        )
        expect(errors).toBeNull()
    })
})