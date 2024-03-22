import { SimpleName } from "@/shared/values-objects/SimpleName";
import { Chapter, IChapterProps } from "./Chapter";
import { Entity, IEntityProps } from "./Entity";
import { Duration } from "@/shared/values-objects/Duration";
import { Order } from "@/shared/values-objects/Order";
import { ErrorValidation } from "@/error/ErrorValidation";
import { Errors } from "@/constants/errors.constants";
import { Class } from "./Class";

export interface ICourseProps extends IEntityProps {
  name?: string;
  date?: Date;
  chapters?: IChapterProps[];
  duration?: number;
  totalClass?: number;
}

export class Course extends Entity<ICourseProps, Course> {
  readonly name: SimpleName;
  readonly date: Date;
  readonly chapters: Chapter[];
  readonly duration: Duration;
  readonly totalClass: number;

  constructor(props: ICourseProps) {
    super({
      ...props,
      ...Course.calculateData(props),
      date: props.date ?? new Date(),
      chapters: Course.orderChapters(props.chapters ?? []),
    });

    this.name = new SimpleName({ value: this.props.name!, min: 3, max: 50 });
    this.date = this.props.date!;
    this.chapters = this.props.chapters!.map((chapter) => new Chapter(chapter));
    this.duration = new Duration(this.props.duration);
    this.totalClass = this.props.totalClass!;

    const { duration, totalClass } = this.props;

    if (duration! <= 0) {
      ErrorValidation._throw({
        code: Errors.COURSE_WITHOUT_DUARATION,
        value: duration,
      });
    }

    if (totalClass! <= 0) {
      ErrorValidation._throw({
        code: Errors.COURSE_WITHOUT_CLASSES,
        value: totalClass,
      });
    }
  }

  private static calculateData(props: ICourseProps) {
    if (!props.chapters?.length) {
      return {
        duration: props.duration ?? 0,
        totalClass: props.totalClass ?? 0,
      };
    }

    const chapters = props.chapters.map((chapter) => new Chapter(chapter));
    const duration = chapters.reduce(
      (total, current) => total + current.duration._seconds,
      0
    );
    const totalClass = chapters.reduce(
      (total, current) => total + current.totalClasses,
      0
    );
    return {
      duration,
      totalClass,
    };
  }

  private static assignOrders(chapters: Chapter[]): Chapter[] {
    return chapters.map((chapter, index) =>
      chapter.clone({ order: index + 1 })
    );
  }

  private static orderChapters(chapters: IChapterProps[]): IChapterProps[] {
    const chapterList = chapters.map((chapter) => new Chapter(chapter));
    const orderedChapters = chapterList.sort(Order.sort);
    return Course.assignOrders(orderedChapters).map((c) => c.props);
  }

  addChapter(chapter: Chapter, position?: number): Course {
    const newChapters =
      position !== undefined
        ? [
            ...this.chapters.slice(0, position),
            chapter,
            ...this.chapters.slice(position),
          ]
        : [...this.chapters, chapter];
    const chapters = Course.assignOrders(newChapters).map((a) => a.props);
    return this.clone({ chapters });
  }

  removeChapter(chapter: Chapter): Course {
    const othersChapters = this.chapters.filter((c) => c.isDifferent(chapter));
    const chapters = Course.assignOrders(othersChapters).map((c) => c.props);
    return this.clone({ chapters });
  }

  moveChapter(chapter: Chapter, position: number): Course {
    return this.removeChapter(chapter).addChapter(chapter, position);
  }

  moveChapterUp(chapter: Chapter): Course {
    const position = this.chapters.findIndex((c) => c.isEqual(chapter));
    const first = position === 0;
    return first ? this : this.moveChapter(chapter, position - 1);
  }

  moveChapterDown(chapter: Chapter): Course {
    const position = this.chapters.findIndex((a) => a.isEqual(chapter));
    const last = position === this.chapters.length - 1;
    return last ? this : this.moveChapter(chapter, position + 1);
  }

  updateClass(_class: Class): Course {
    const chapters = this.chapters.map((chapter) => {
      const classes = chapter.classes.map((classItem) =>
        classItem.isEqual(_class) ? _class : classItem
      );
      return {
        ...chapter.props,
        classes: classes.map((c) => c.props),
      } as IChapterProps;
    });
    return this.clone({ chapters });
  }

  get firstChapter() {
    return this.chapters[0];
  }

  get lastChapter() {
    return this.chapters[this.chapters.length - 1];
  }

  get classes(): Class[] {
    return this.chapters.flatMap((c) => c.classes);
  }
}
