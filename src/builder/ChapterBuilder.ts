import { Chapter, IChapterProps } from '@/entity/Chapter'
import { faker } from '@faker-js/faker'
import { ChapterNames } from '@/mocks/ChapterNames'
import ClassBuilder from './ClassBuilder'
import { Class, IClassProps } from '@/entity/Class'

export default class ChapterBuilder {
  private constructor(private props: IChapterProps) {}

  static create(totalClass: number = 10): ChapterBuilder {
    return new ChapterBuilder({
      name: ChapterNames.random(),
      order: faker.number.int({ min: 1, max: 100 }),
      classes: ClassBuilder.createListWith(totalClass).map((a) => a.props),
    })
  }

  static createListWith(totalChapter: number, totalClass: number): Chapter[] {
    const chapter = (i: number) =>
      ChapterBuilder.create(totalClass)
        .withOrder(i + 1)
        .now()
    return Array.from({ length: totalChapter }).map((_, i) => chapter(i))
  }

  withId(id: string): ChapterBuilder {
    this.props.id = id
    return this
  }

  withName(name: string): ChapterBuilder {
    this.props.name = name
    return this
  }

  withoutName(): ChapterBuilder {
    this.props.name = undefined
    return this
  }

  withOrder(order: number): ChapterBuilder {
    this.props.order = order
    return this
  }

  withoutOrder(): ChapterBuilder {
    this.props.order = undefined
    return this
  }

  withClass(classes: (Class | IClassProps)[]): ChapterBuilder {
    this.props.classes = classes.map((a) => (a instanceof Class ? a.props : a))
    return this
  }

  withoutClass(): ChapterBuilder {
    this.props.classes = undefined
    return this
  }

  now(): Chapter {
    return new Chapter(this.props)
  }
}
