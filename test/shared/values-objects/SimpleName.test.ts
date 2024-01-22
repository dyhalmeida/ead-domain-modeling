import { Errors } from "@/constants/errors.constants"
import { SimpleName } from "@/shared/values-objects/SimpleName"

describe('SimpleName', () => {

    it('Should create a valid instance of a simple name', () => {
        const simpleName = new SimpleName({
            value: 'clean code',
            min: 3,
            max: 30
        })
        expect(simpleName.fullname).toBe('clean code')
    })

    it('Should throw an error when creating an instance of SimpleName with empty value', () => {
        try {
            new SimpleName({
                value: undefined as any,
                min: 3,
                max: 30
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.EMPTY_NAME)
        }

        try {
            new SimpleName({
                value: null as any,
                min: 3,
                max: 30
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.EMPTY_NAME)
        }

        try {
            new SimpleName({
                value: '',
                min: 3,
                max: 30
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.EMPTY_NAME)
        }
    })

    it('Should throw an error when creating an instance of SimpleName with small name', () => {
        try {
            new SimpleName({
                value: 'Java',
                min: 5,
                max: 30
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.SMALL_NAME)
        }
    })

    it('Should throw an error when creating an instance of SimpleName with big name', () => {
        try {
            new SimpleName({
                value: 'Javascript',
                min: 5,
                max: 8
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.BIG_NAME)
        }
    })
})