import { Class, IClassProps } from '@/entity/Class'
import { faker } from '@faker-js/faker'
import { ClassNames } from '@/mocks/ClassNames'

export default class ClassBuilder {
  private constructor(public props: IClassProps) {}

  static create(name?: string): ClassBuilder {
    return new ClassBuilder({
      name: name ?? ClassNames.random(),
      duration: faker.number.int({ min: 90, max: 3600 }),
      url: faker.internet.url(),
      order: faker.number.int({ min: 1, max: 100 }),
    })
  }

  static createListWith(quantity: number): Class[] {
    const _class = (i: number) =>
      ClassBuilder.create()
        .withOrder(i + 1)
        .now()
    return Array.from({ length: quantity }).map((_, i) => _class(i))
  }

  withId(id: string): ClassBuilder {
    this.props.id = id
    return this
  }

  withName(name: string): ClassBuilder {
    this.props.name = name
    return this
  }

  withoutName(): ClassBuilder {
    this.props.name = undefined
    return this
  }

  withDuration(duration: number): ClassBuilder {
    this.props.duration = duration
    return this
  }

  withoutDuration(): ClassBuilder {
    this.props.duration = undefined
    return this
  }

  withOrder(order: number): ClassBuilder {
    this.props.order = order
    return this
  }

  withoutOoder(): ClassBuilder {
    this.props.order = undefined
    return this
  }

  now(): Class {
    return new Class(this.props)
  }
}
