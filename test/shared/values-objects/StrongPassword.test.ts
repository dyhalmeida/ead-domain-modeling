import { Errors } from "@/constants/errors.constants"
import { StrongPassword } from "@/shared/values-objects/StrongPassword"

describe('StrongPassword', () => {

    it('Should thow an error if a password is not provided', () => {
        try {
            const password = new StrongPassword()
        } catch (error: any) {
            expect(error.code).toBe(Errors.PASSWORD_NOT_PROVIDED)
        }
    })

    it('Should thow an error if a password with only number is provided', () => {
        try {
            const password = new StrongPassword('123456789')
        } catch (error: any) {
            expect(error.code).toBe(Errors.WEAK_PASSWORD)
        }
    })

    it('Should thow an error if a password with only letters is provided', () => {
        try {
            const password = new StrongPassword('AbCdEfGhIj')
        } catch (error: any) {
            expect(error.code).toBe(Errors.WEAK_PASSWORD)
        }
    })

    it('Should thow an error if a password with only special characters is provided', () => {
        try {
            const password = new StrongPassword('!@#$%¨&*()_+')
        } catch (error: any) {
            expect(error.code).toBe(Errors.WEAK_PASSWORD)
        }
    })

    it('Should throw an error if a password is less than 8 characters', () => {
        try {
            const password = new StrongPassword('$aJ6%rR1')
        } catch (error: any) {
            expect(error.code).toBe(Errors.WEAK_PASSWORD)
        }
    })

    it('Should create a strong password instance', () => {
        const password = new StrongPassword('$aJ6%rR1$#NH12')
        expect(password.value).toBe('$aJ6%rR1$#NH12')
    })
})