import { Errors } from "@/constants/errors.constants"
import { Order } from "@/shared/values-objects/Order"

describe('Order', () => {

    it('Shoudl create a valid instance of Order with value 1, with empty constructor', () => {
        const order = new Order()
        expect(order.value).toBe(1)
    })

    it('Should create a valid instance of Order with value 1000', () => {
        const order = new Order(1000)
        expect(order.value).toBe(1000)
    })

    it('Should compare three instances of Order for ordering', () => {
        const order1 = new Order(1)
        const order2 = new Order(2)
        const order3 = new Order(2)

        expect(order1.compare(order2)).toBe(-1)
        expect(order2.compare(order1)).toBe(1)
        expect(order3.compare(order2)).toBe(0)
    })

    it('Should compare two instances of Order as equal', () => {
        const order1 = new Order(1)
        const order2 = new Order(1)
        expect(order1.isEqual(order2)).toBeTruthy()
    })

    it('Should compare two instances of Order as different', () => {
        const order1 = new Order(1)
        const order2 = new Order(2)
        expect(!order1.isEqual(order2)).toBeTruthy()
    })

    it('Should order correctly', () => {
        const itens = [
            { order: new Order(3) },
            { order: new Order(1) },
            { order: new Order(2) },
        ]
        itens.sort(Order.sort)
        expect(itens[0].order.value).toBe(1)
        expect(itens[1].order.value).toBe(2)
        expect(itens[2].order.value).toBe(3)
    })

    it('Should throw an error when creating an Order instance with zero value', () => {
        try {
            new Order(0)
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_ORDER)
        }
    })

    it('Should throw an error when creating an Order instance with negative value', () => {
        try {
            new Order(-5)
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_ORDER)
        }
    })
})