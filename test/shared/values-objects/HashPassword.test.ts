import { Errors } from "@/constants/errors.constants"
import { HashPassword } from "@/shared/values-objects/HashPassword"

describe('HashPassowrd', () => {
    it('Should throw an error if the hash is just numbers', () => {
        try {
            new HashPassword('0123456789')
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_HASH_PASSWORD)
        }
    })

    it('Should throw an error if the hash is just letters', () => {
        try {
            new HashPassword('AbCdEfGhIj')
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_HASH_PASSWORD)
        }
    })

    it('Should throw an error if the hash is only special characters', () => {
        try {
            new HashPassword('!@#$%¨&*()_+')
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_HASH_PASSWORD)
        }
    })

    it('Should throw an error if the hash has less than 8 characters', () => {
        try {
            new HashPassword('$2a$08')
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_HASH_PASSWORD)
        }
    })

    it('Should throw an error if the hash is not provided', () => {
        try {
            new HashPassword()
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_HASH_PASSWORD)
        }
    })

    it('Should create valid HashPassword instances', () => {
        const hashs = [
            '$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6',
            '$2a$08$7uZhkstRVOk84If8gt0r4eWih3nfGdWduZpIcj1MzNJiS.UgIEF7.',
            '$2a$13$VHgPnA1ymVG3QsTyCZ8GG.IfZ4jljSbI/MSgRSx6Tbj2jXxfgdjoC',
            '$2a$13$7/Gb19Ma6OsiFR/UsGBMKej/Eun98.d2x0IUtGku1gh4FCZEpRVfq',
        ]
        for (const hash of hashs) {
            expect(new HashPassword(hash)).toBeDefined()
        }

    })
})