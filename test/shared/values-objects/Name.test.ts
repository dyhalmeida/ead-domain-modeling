import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"
import { Name } from "@/shared/values-objects/Name"

describe('Name', () => {
    it('Should throw an error if the name is empty', () => {
        try {
            new Name('')
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.EMPTY_NAME)
        }
    })

    it('Should throw an error if name is less than 4 characters', () => {
        try {
            new Name('Di')
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.SMALL_NAME)
        }
    })

    it('Should throw an error if name is less than 120 characters', () => {
        const bigName = 'Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga de Bragança e Habsburgo'
        try {
            new Name(bigName)
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.BIG_NAME)
        }
    })

    it('Should throw an error if the name does not have a lastname', () => {
        try {
            new Name('Diego')
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.NAME_WITHOUT_LAST_NAME)
        }
    })

    it('Should throw an error if the name has special characters', () => {
        try {
            new Name('Di3go @lmeid@')
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.NAME_WITH_INVALID_CHARACTERS)
        }
    })

    it('Should return full name', () => {
        const name = new Name('John Doe')
        expect(name.fullname).toBe('John Doe')
    })

    it('Should return first name', () => {
        const peopleName = new Name('John Doe')
        expect(peopleName.firstname).toBe('John')
    })

    it('Should return surnames', () => {
        const peopleName = new Name('John Doe Gin')
        expect(peopleName.surnames).toBe('Doe Gin')
    })

    it('Should return lastname', () => {
        const peopleName = new Name('John Doe Gin')
        expect(peopleName.lastname).toBe('Gin')
    })

    it('Should throw several errors when creating an empty name', () => {
        try {
            new Name('')
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.EMPTY_NAME)
            expect(error[1].code).toBe(Errors.SMALL_NAME)
            expect(error[2].code).toBe(Errors.NAME_WITHOUT_LAST_NAME)
        }
    })
})