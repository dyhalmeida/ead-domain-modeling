import { Errors } from "@/constants/errors.constants"
import { Email } from "@/shared/values-objects/Email"

describe('Email', () => {

    it('Should create valid instance of Email', () => {
        const email = new Email('john.doe@mail.com')
        expect(email.value).toBe('john.doe@mail.com')
    })

    it('Should get user of email', () => {
        const email = new Email('john.doe@mail.com')
        expect(email.user).toBe('john.doe')
    })

    it('Should get domain of email', () => {
        const email = new Email('john.doe@mail.com')
        expect(email.domain).toBe('mail.com')
    })

    it('Should thow an erro if prodive a invalid email', () => {
        try {
            const email = new Email('john@doe123@mail.com.br.net')
        } catch (error: any) {
            expect(error.code).toBe(Errors.INVALID_EMAIL)
        }

        try {
            const email = new Email('')
        } catch (error: any) {
            expect(error.code).toBe(Errors.INVALID_EMAIL)
        }

        try {
            const email = new Email('john.doe')
        } catch (error: any) {
            expect(error.code).toBe(Errors.INVALID_EMAIL)
        }

        try {
            const email = new Email('john.doe@mail')
        } catch (error: any) {
            expect(error.code).toBe(Errors.INVALID_EMAIL)
        }

        try {
            const email = new Email()
        } catch (error: any) {
            expect(error.code).toBe(Errors.INVALID_EMAIL)
        }
    })
})