export const sum = (...values: number[]) => {
    return values.reduce((acc, value) => {
        return acc + value
    }, 0)
}
