import { Errors } from "@/constants/errors.constants"
import { Id } from "@/shared/values-objects/Id"

describe('Id', () => {

    it('Should create a new valid id', () => {
        const id = Id.new
        expect(id.value).toHaveLength(36)
        expect(id.isNew).toBeTruthy()
    })

    it('Should throw an error when creating an invalid id', () => {
        expect(() => new Id('1234')).toThrow(Errors.INVALID_ID)
    })

    it('Should create a valid id from an existing id', () => {
        const existingId = Id.new.value
        const id = new Id(existingId)
        expect(id.value).toHaveLength(36)
        expect(id.isNew).toBeFalsy()
    })

    it('Should compare two identical ids', () => {
        const id1 = new Id()
        const id2 = new Id(id1.value)

        expect(id1.isEqual(id2)).toBeTruthy()
        expect(id1.isDifferent(id2)).toBeFalsy()
    })

    it('Should compare two different ids', () => {
        const id1 = new Id()
        const id2 = new Id()

        expect(id1.isEqual(id2)).toBeFalsy()
        expect(id1.isDifferent(id2)).toBeTruthy()
    })

    it('Should compare id with undefined', () => {
        const id1 = new Id()
        const id2 = undefined

        expect(id1.isEqual(id2 as any)).toBeFalsy()
        expect(id1.isDifferent(id2 as any)).toBeTruthy()
    })
})
