import { sum } from "@/index"

describe('Sum function', () => {
    it('Should do a sum operation correctly', () => {
        expect(sum(4,4,4)).toBe(12)
    })
})
