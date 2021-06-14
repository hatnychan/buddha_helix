export class StrParam {
    readonly id?: number

    readonly createdAt?: Date

    readonly updatedAt?: Date

    readonly code: string

    readonly key: string

    readonly value: string

    constructor(code: string, key: string, value: string) {
        this.code = code
        this.key = key
        this.value = value
    }
}
export default StrParam
