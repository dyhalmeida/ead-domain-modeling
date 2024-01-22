import { Errors } from "@/constants/errors.constants"
import { Duration } from "@/shared/values-objects/Duration"

describe('Duration', () => {

    it('Should create a Duration instance with the hours, minutes and seconds zero', () => {
        expect(new Duration()._seconds).toBe(0)
        expect(new Duration().HMS).toBe('00h 00m 00s')
        expect(new Duration().HM).toBe('00h 00m')
        expect(new Duration().isReset()).toBe(true)
    })

    it('Should create a Duration instance with the hours, minutes and seconds zero', () => {
        expect(new Duration(0)._seconds).toBe(0)
        expect(new Duration(0).HMS).toBe('00h 00m 00s')
        expect(new Duration(0).HM).toBe('00h 00m')
        expect(new Duration(0).isReset()).toBe(true)
    })

    it('Should create an instance of Duration with h:m correctly formatted', () => {
        expect(new Duration(3600).HM).toBe('01h 00m')
        expect(new Duration(3660).HM).toBe('01h 01m')
        expect(new Duration(180).HM).toBe('00h 03m')
    })

    it('Should create an instance of Duration with h:m:S correctly formatted', () => {
        expect(new Duration(3601).HMS).toBe('01h 00m 01s')
        expect(new Duration(3660).HMS).toBe('01h 01m 00s')
        expect(new Duration(180).HMS).toBe('00h 03m 00s')
        expect(new Duration(58).HMS).toBe('00h 00m 58s')
    })

    it('Should create two instances of Duration and add their seconds', () => {
        const d1 = new Duration(3600)
        const d2 = new Duration(180)
        expect(d1.sum(d2)._seconds).toBe(3780)
        expect(d1.sum(d2).HM).toBe('01h 03m')
    })

    it('Should create two instances of Duration and compare if the seconds are the same', () => {
        const d1 = new Duration(3600)
        const d2 = new Duration(3600)
        expect(d1.isEqual(d2)).toBeTruthy()
    })

    it('Should throw an error by creating an instance with negative seconds', () => {
        try {
            new Duration(-60)
        } catch (error: any) {
            expect(error.code).toBe(Errors.INVALID_DURATION)
        }
    })
})