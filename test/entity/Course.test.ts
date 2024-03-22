import ChapterBuilder from '@/builder/ChapterBuilder'
import ClassBuilder from '@/builder/ClassBuilder'
import { CourseBuilder } from '@/builder/CourseBuilder'
import { Errors } from '@/constants/errors.constants'
import { Course } from '@/entity/Course'
import { CourseNames } from '@/mocks/CourseNames'
import { Id } from '@/shared/values-objects/Id'

describe('Course', () => {
  it('should create a course instance with a new id', () => {
    const course = CourseBuilder.create().withoutId().now()
    expect(course.id.value).toBeDefined()
  })

  it('should throw an error when creating an unnamed course instance', () => {
    try {
      const course = CourseBuilder.create().withoutName().now()
    } catch (error: any) {
      expect(error[0]?.code).toBe(Errors.EMPTY_NAME)
      expect(error[1]?.code).toBe(Errors.SMALL_NAME)
    }
  })

  it('should throw an error when creating a course instance without duration and without chapters', () => {
    try {
      const course = CourseBuilder.create()
        .withoutDuration()
        .withoutChapters()
        .now()
    } catch (error: any) {
      expect(error?.code).toBe(Errors.COURSE_WITHOUT_DUARATION)
    }
  })

  it('should throw an error when creating a course instance without totalClass and without chapters', () => {
    try {
      const course = CourseBuilder.create()
        .whitoutTotalClass()
        .withDuration(100)
        .withoutChapters()
        .now()
    } catch (error: any) {
      expect(error?.code).toBe(Errors.COURSE_WITHOUT_CLASSES)
    }
  })

  it('should calculate the duration of a course instance', () => {
    const classes = [
      ClassBuilder.create('Class #1').withDuration(63).withOrder(1).now(),
      ClassBuilder.create('Class #2').withDuration(1007).withOrder(2).now(),
      ClassBuilder.create('Class #3').withDuration(3784).withOrder(3).now(),
    ]

    const chapter = ChapterBuilder.create().withClass(classes).now()

    const course = CourseBuilder.create()
      .withChapters([
        chapter,
        chapter.clone({ id: Id.new.value }),
        chapter.clone({ id: Id.new.value }),
      ])
      .now()

    expect(course.props.duration).toBe(14562)
    expect(course.duration._seconds).toBe(14562)
    expect(course.duration.HMS).toBe('04h 02m 42s')
  })

  it('should create a course instance without chapters and maintain the amount of classes and duration', () => {
    const course = CourseBuilder.create()
      .withoutChapters()
      .withDuration(60 * 58)
      .withTotalClass(45)
      .now()
    expect(course.chapters).toHaveLength(0)
    expect(course.duration.HM).toBe('00h 58m')
    expect(course.totalClass).toBe(45)
  })

  it('should recalculate the duration and number of classes when you have chapters', () => {
    const course = CourseBuilder.create(10, 20)
      .withDuration(60 * 58)
      .withTotalClass(45)
      .now()
    expect(course.totalClass).toBe(200)
    expect(course.duration._seconds).toBeGreaterThan(0)
  })

  it('should calculate the order of the chapters correctly when creating a course instance', () => {
    const chapters = [
      ChapterBuilder.create().withOrder(1).now(),
      ChapterBuilder.create().withOrder(1).now(),
      ChapterBuilder.create().withOrder(1).now(),
    ]
    const course = CourseBuilder.create().withChapters(chapters).now()
    expect(course.chapters[0].order.value).toBe(1)
    expect(course.chapters[1].order.value).toBe(2)
    expect(course.chapters[2].order.value).toBe(3)
  })

  it('should create a course instance with undefined chapters', () => {
    const course = new Course({
      name: CourseNames.random(),
      duration: 100,
      totalClass: 10,
      chapters: undefined,
    })
    expect(course.chapters).toHaveLength(0)
  })

  it('should throw an error when creating a course instance with chapter without class', () => {
    try {
      new Course({
        name: CourseNames.random(),
        duration: 100,
        totalClass: 1,
        chapters: [{ name: 'Chapter #1', order: 1, classes: undefined }],
      })
    } catch (error: any) {
      expect(error?.code).toBe(Errors.CHAPTER_WITHOUT_CLASS)
    }
  })

  it('should add a new chapter to the course instance', () => {
    const course = CourseBuilder.create().now()
    const newChapter = ChapterBuilder.create().now()
    const newCourse = course.addChapter(newChapter)
    expect(newCourse.lastChapter.name.fullname).toBe(newChapter.name.fullname)
  })

  it('should add a new chapter at the beginning in a course instance', () => {
    const course = CourseBuilder.create().now()
    const newChapter = ChapterBuilder.create().now()
    const newCourse = course.addChapter(newChapter, 0)
    expect(newCourse.firstChapter.name.fullname).toBe(newChapter.name.fullname)
  })

  it('should remove a chapter to the course instance', () => {
    const course = CourseBuilder.create().now()
    const secondChapter = course.chapters[1]
    const newCourse = course.removeChapter(secondChapter)
    expect(newCourse.chapters.length).toBe(course.chapters.length - 1)
  })

  it('should move the chapter down', () => {
    const course = CourseBuilder.create().now()
    const secondChapter = course.chapters[1]
    const newCourse = course.moveChapterDown(secondChapter)
    expect(newCourse.chapters[2].name.fullname).toBe(
      secondChapter.name.fullname
    )
  })

  it('should move the chapter up', () => {
    const course = CourseBuilder.create().now()
    const secondChapter = course.chapters[1]
    const newCourse = course.moveChapterUp(secondChapter)
    expect(newCourse.chapters[0].name.fullname).toBe(
      secondChapter.name.fullname
    )
  })

  it('should ignore when moving the first chapter up', () => {
    const course = CourseBuilder.create().now()
    const newCourse = course.moveChapterUp(course.firstChapter)
    expect(newCourse).toBe(course)
  })

  it('should ignore when moving the last chapter down', () => {
    const course = CourseBuilder.create().now()
    const newCourse = course.moveChapterDown(course.lastChapter)
    expect(newCourse).toBe(course)
  })

  it('should update a class in the course instance', () => {
    const course = CourseBuilder.create().now()
    const newClass = course.classes[0].clone({ duration: 10000 })
    const newCourse = course.updateClass(newClass)
    expect(newCourse.firstChapter.firstClass.name.fullname).toBe(
      newClass.name.fullname
    )
    expect(newCourse.chapters[0].classes[0].duration._seconds).toBe(
      newClass.duration._seconds
    )
  })
})
