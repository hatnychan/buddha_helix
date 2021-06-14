import User from './User'

export class UserIdLink {
    readonly id?: number

    readonly createdAt?: Date

    readonly updatedAt?: Date

    readonly userId: number

    readonly linkedIdName: string

    readonly linkedId: string

    user?: User

    constructor(userId: number, linkedIdName: string, linkedId: string) {
        this.userId = userId
        this.linkedIdName = linkedIdName
        this.linkedId = linkedId
    }
}
export default UserIdLink
