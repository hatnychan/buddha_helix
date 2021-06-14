export class NumParam {
    readonly id?: number

    readonly createdAt?: Date

    readonly updatedAt?: Date

    readonly code: string

    readonly key: string

    readonly value: number

    constructor(code: string, key: string, value: number) {
        this.code = code
        this.key = key
        this.value = value
    }
}
export default NumParam
