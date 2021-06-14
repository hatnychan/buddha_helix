export class GameLog {
    readonly id?: number

    readonly createdAt?: Date

    readonly updatedAt?: Date

    readonly code: string

    readonly key: string

    readonly lang: string

    readonly value: string

    constructor(code: string, key: string, lang: string, value: string) {
        this.code = code
        this.key = key
        this.lang = lang
        this.value = value
    }
}
export default GameLog
