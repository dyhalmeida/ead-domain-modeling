import { SimpleName } from "@/shared/values-objects/SimpleName";
import { Class, IClassProps } from "./Class";
import { Entity, IEntityProps } from "./Entity";
import { Order } from "@/shared/values-objects/Order";
import { ErrorValidation } from "@/error/ErrorValidation";
import { Errors } from "@/constants/errors.constants";
import { Duration } from "@/shared/values-objects/Duration";

export interface IChapterProps extends IEntityProps {
    name?: string
    order?: number
    classes?: IClassProps[]
}

export class Chapter extends Entity<IChapterProps, Chapter> {
    readonly name: SimpleName
    readonly order: Order
    readonly classes: Class[]

    constructor(props: IChapterProps) {
        props = {
            ...props,
            classes: Chapter.orderClasses(props.classes || [])
        }
        super(props)
        this.name = new SimpleName({ value: props.name!, min: 3, max: 50 })
        this.order = new Order(props.order)

        if (!this.props.classes?.length) ErrorValidation._throw({ value: props.classes, code: Errors.CHAPTER_WITHOUT_CLASS })
        this.classes = this.props.classes.map((c) => new Class({ ...c }))
    }

    private static assignOrders(classes: Class[]): Class[] {
        return classes.map((c, index) => c.clone({ order: index + 1 }))
    }

    private static orderClasses(classesProps: IClassProps[]): IClassProps[] {
        const classes = classesProps.map((props) => new Class(props))
        const orderedClasses = classes.sort(Order.sort)
        return Chapter.assignOrders(orderedClasses).map((c) => c.props)
    }

    get duration(): Duration {
        return this.classes.reduce((totalDuration: Duration, _class: Class) => {
            return totalDuration.sum(_class.duration)
        }, new Duration(0))
    }

    get totalClasses(): number {
        return this.classes.length
    }

    get firstClass(): Class {
        return this.classes[0]
    }

    get lastClass(): Class {
        return this.classes[this.classes.length - 1]
    }
}