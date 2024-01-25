import { Errors } from "@/constants/errors.constants";
import { ErrorValidation } from "@/error/ErrorValidation";

interface ISortParam {
    order: Order
}

export class Order {

    constructor(public readonly value: number = 1) {
        if (value <= 0) ErrorValidation._throw({ code: Errors.INVALID_ORDER , value })
    }

    public isEqual(order: Order) {
        return this.value === order.value
    }

    public compare(order: Order) {
        if (this.isEqual(order)) return 0
        return this.value > order.value ? 1 : -1
    }

    public static sort(a: ISortParam, b: ISortParam) {
        return a.order.compare(b.order)
    }
}