import { Errors } from "@/constants/errors.constants"
import { Chapter } from "@/entity/Chapter"
import { Class, IClassProps } from "@/entity/Class"

describe('Chapter', () => {

    it('Should throw an error when creating an unnamed Chapter instance', () => {
        try {
            new Chapter({
                name: ''
            })
        } catch (error: any) {
            expect(error[0].code).toBe(Errors.EMPTY_NAME)
        }
    })

    it('Should throw an error when trying to create a Chapter instance without classes', () => {
        try {
            new Chapter({
                name: 'Any chpater name',
                classes: []
            })
        } catch (error: any) {
            expect(error?.code).toBe(Errors.CHAPTER_WITHOUT_CLASS)
        }
    })

    it('Should create a Chapter instance with default orderm equal to 1', () => {
        const _class: IClassProps = { name: 'Any name class', url: 'https://youtube.com/any', duration: 3000 }
        const chapter = new Chapter({
            name: 'Any chapter name',
            classes: [_class],
        })
        expect(chapter.order.value).toBe(1)
    })

    it('Should throw an error when creating a Chapter instance with zero order', () => {
        try {
            const _class: IClassProps = { name: 'Any name class', url: 'https://youtube.com/any', duration: 3000 }
            new Chapter({
                name: 'Any chapter name',
                classes: [_class],
                order: 0
            })
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_ORDER)
        }
    })

    it('Should throw an error when creating a Chapter instance with negative order', () => {
        try {
            const _class: IClassProps = { name: 'Any name class', url: 'https://youtube.com/any', duration: 3000 }
            new Chapter({
                name: 'Any chapter name',
                classes: [_class],
                order: -10
            })
        } catch (error: any) {
            expect(error?.code).toBe(Errors.INVALID_ORDER)
        }
    })

    it('Should calculate the total duration of an instance of a Chapter', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #1', url: 'https://youtube.com/class/1', order: 1, duration: 120 },
            { name: 'Any class #2', url: 'https://youtube.com/class/2', order: 2, duration: 180 },
            { name: 'Any class #3', url: 'https://youtube.com/class/3', order: 3, duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })

        expect(chapter.duration._seconds).toBe(480)
        expect(chapter.duration.HMS).toBe('00h 08m 00s')
    })

    it('Should get the number of classes from a Chapter instance', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #1', url: 'https://youtube.com/class/1', order: 1, duration: 120 },
            { name: 'Any class #2', url: 'https://youtube.com/class/2', order: 2, duration: 180 },
            { name: 'Any class #3', url: 'https://youtube.com/class/3', order: 3, duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })
        expect(chapter.totalClasses).toBe(3)
    })

    it('Should get the first class of a Chapter instance', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #1', url: 'https://youtube.com/class/1', order: 1, duration: 120 },
            { name: 'Any class #2', url: 'https://youtube.com/class/2', order: 2, duration: 180 },
            { name: 'Any class #3', url: 'https://youtube.com/class/3', order: 3, duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })
        expect(chapter.firstClass.name.value).toBe('Any class #1')
    })

    it('Should get the last class of a Chapter instance', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #1', url: 'https://youtube.com/class/1', order: 1, duration: 120 },
            { name: 'Any class #2', url: 'https://youtube.com/class/2', order: 2, duration: 180 },
            { name: 'Any class #3', url: 'https://youtube.com/class/3', order: 3, duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })
        expect(chapter.lastClass.name.value).toBe('Any class #3')
    })

    it('Should get the classes ordered correctly when creating a Chapter instance with classes without orders', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #1', url: 'https://youtube.com/class/1', duration: 120 },
            { name: 'Any class #2', url: 'https://youtube.com/class/2', duration: 180 },
            { name: 'Any class #3', url: 'https://youtube.com/class/3', duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })
        expect(chapter.classes[0].order.value).toBe(1)
        expect(chapter.classes[1].order.value).toBe(2)
        expect(chapter.classes[2].order.value).toBe(3)

        expect(chapter.props.classes![0].order).toBe(1)
        expect(chapter.props.classes![1].order).toBe(2)
        expect(chapter.props.classes![2].order).toBe(3)
    })

    it('Should add a class in the last position in an instance of a Chapter', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #1', url: 'https://youtube.com/class/1', duration: 120 },
            { name: 'Any class #2', url: 'https://youtube.com/class/2', duration: 180 },
            { name: 'Any class #3', url: 'https://youtube.com/class/3', duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })

        const _class = new Class({
            name: 'Any class #4',
            duration: 220,
            url: 'https://youtube.com/class/4'
        })

        const newChapter = chapter.addClass(_class)
        expect(newChapter.lastClass.name.value).toBe(_class.name.value)
        expect(newChapter.totalClasses).toBe(4)
    })

    it('Should add a class in the first position in an instance of a Chapter', () => {
        const classes: IClassProps[] = [
            { name: 'Any class #2', url: 'https://youtube.com/class/1', duration: 120 },
            { name: 'Any class #3', url: 'https://youtube.com/class/2', duration: 180 },
            { name: 'Any class #4', url: 'https://youtube.com/class/3', duration: 180 },
        ]
        const chapter = new Chapter({
            name: 'Any chapter name #1',
            classes: [...classes],
            order: 1
        })

        const _class = new Class({
            name: 'Any class #1',
            duration: 220,
            url: 'https://youtube.com/class/4'
        })

        const position = 0
        const newChapter = chapter.addClass(_class, position)
        expect(newChapter.firstClass.name.value).toBe(_class.name.value)
        expect(newChapter.totalClasses).toBe(4)
    })
})