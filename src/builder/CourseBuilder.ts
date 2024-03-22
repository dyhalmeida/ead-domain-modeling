import { faker } from '@faker-js/faker'
import { Course, ICourseProps } from '../entity/Course'
import { Chapter } from '../entity/Chapter'
import ChapterBuilder from './ChapterBuilder'
import { CourseNames } from '@/mocks/CourseNames'

export class CourseBuilder {
  private constructor(private props: ICourseProps) {}

  static create(totalChapters: number = 10, totalClass: number = 10) {
    return new CourseBuilder({
      name: CourseNames.random(),
      date: faker.date.recent(),
      chapters: ChapterBuilder.createListWith(totalChapters, totalClass).map(
        (c) => c.props
      ),
    })
  }

  withId(id: string): CourseBuilder {
    this.props.id = id
    return this
  }

  withoutId(): CourseBuilder {
    this.props.id = undefined
    return this
  }

  withName(name: string): CourseBuilder {
    this.props.name = name
    return this
  }

  withoutName(): CourseBuilder {
    this.props.name = undefined
    return this
  }

  withDuration(duration: number): CourseBuilder {
    this.props.duration = duration
    return this
  }

  withoutDuration(): CourseBuilder {
    this.props.duration = undefined
    return this
  }

  withTotalClass(totalClass: number): CourseBuilder {
    this.props.totalClass = totalClass
    return this
  }

  whitoutTotalClass(): CourseBuilder {
    this.props.totalClass = undefined
    return this
  }

  withChapters(chapters: Chapter[]): CourseBuilder {
    this.props.chapters = chapters.map((a) => a.props)
    return this
  }

  withoutChapters(): CourseBuilder {
    this.props.chapters = undefined
    return this
  }

  now(): Course {
    return new Course(this.props)
  }
}
