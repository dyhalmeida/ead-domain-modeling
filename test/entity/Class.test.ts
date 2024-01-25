import { Errors } from "@/constants/errors.constants"
import { Class } from "@/entity/Class"

describe('Class', () => {

    it('Should throw an error when creating a Class instance with the duration value set to zero', () => {
        try {
            new Class({
                name: 'Hook useState',
                duration: 0,
                order: 10,
                url: 'https://spacestudy.com/react'
            })
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_DURATION)
        }
    })

    it('Should throw an error when creating a Class instance with the order value set to zero', () => {
        try {
            new Class({
                name: 'Hook useState',
                duration: 600,
                order: 0,
                url: 'https://spacestudy.com/react'
            })
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_ORDER)
        }
    })

    it('Should throw an error when creating an instance of Class with negative order value', () => {
        try {
            new Class({
                name: 'Hook useState',
                duration: 600,
                order: -5,
                url: 'https://spacestudy.com/react'
            })
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_ORDER)
        }
    })

    it('Should throw an error when creating a Class instance with small name', () => {
        try {
            new Class({
                name: 'PR',
                duration: 600,
                order: 10,
                url: 'https://spacestudy.com/github'
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.SMALL_NAME)
        }
    })

    it('Should throw an error when creating an unnamed Class instance', () => {
        try {
            new Class({
                duration: 600,
                order: 10,
                url: 'https://spacestudy.com/github'
            })
        } catch (error: any) {
            expect(error[0]?.code).toBe(Errors.EMPTY_NAME)
        }
    })

    it('Should create an instance of Class with the order value by default equal to 1', () => {
        const class1 = new Class({
            name: 'Hook useState',
            duration: 600,
            url: 'https://spacestudy.com/react'
        })

        expect(class1.order.value).toBe(1)
    })
})