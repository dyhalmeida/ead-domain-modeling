import { SimpleName } from "@/shared/values-objects/SimpleName"
import { Entity, IEntityProps } from "./Entity"
import { Duration } from "@/shared/values-objects/Duration"
import { Url } from "@/shared/values-objects/Url"
import { Order } from "@/shared/values-objects/Order"
import { ErrorValidation } from "@/error/ErrorValidation"
import { Errors } from "@/constants/errors.constants"

export interface IClassProps extends IEntityProps {
    name?: string
    duration?: number
    url?: string
    order?: number
}

export class Class extends Entity<IClassProps, Class> {
    readonly name: SimpleName
    readonly duration: Duration
    readonly url: Url
    readonly order: Order

    constructor(props: IClassProps) {
        super({...props, order: props.order ?? 1})
        this.name = new SimpleName({ value: props.name ?? '', min: 3, max: 50 })
        this.duration = new Duration(this.props.duration)
        this.url = new Url(this.props.url)
        this.order = new Order(this.props.order)

        if (this.duration.isReset()) ErrorValidation._throw({ code: Errors.INVALID_DURATION, value: this.duration.HMS })
    }
}