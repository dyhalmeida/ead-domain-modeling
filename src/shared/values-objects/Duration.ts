import { Errors } from "@/constants/errors.constants"
import { ErrorValidation } from "@/error/ErrorValidation"

export class Duration {
    static readonly MINUTE = 60
    static readonly HOUR = 3600

    readonly _seconds: number

    constructor(value?: number) {
        if (value && value < 0) ErrorValidation._throw({
            code: Errors.INVALID_DURATION,
            value,
        })
        this._seconds = value ?? 0
    }

    sum(duration: Duration) {
        return new Duration(this._seconds + duration._seconds)
    }

    isEqual(duration: Duration) {
        return this._seconds === duration._seconds
    }

    isReset() {
        return this._seconds === 0
    }

    get hours() {
        return Math.floor(this._seconds / Duration.HOUR)
    }

    get minutes() {
        return Math.floor((this._seconds % Duration.HOUR) / Duration.MINUTE)
    }

    get seconds() {
        return this._seconds % Duration.MINUTE
    }

    get HM() {
        const h = this.hours.toString().padStart(2, '0')
        const m = this.minutes.toString().padStart(2, '0')
        return `${h}h ${m}m`
    }

    get HMS() {
        const h = this.hours.toString().padStart(2, '0')
        const m = this.minutes.toString().padStart(2, '0')
        const s = this.seconds.toString().padStart(2, '0')
        return `${h}h ${m}m ${s}s`
    }

}
