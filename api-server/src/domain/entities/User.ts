import UserIdLink from './UserIdLink'

export class User {
    readonly id?: number

    readonly createdAt?: Date

    readonly updatedAt?: Date

    name: string

    location: string

    lang: string

    readonly role: number

    userIdLink?: UserIdLink[]

    constructor(name: string, location: string, lang: string, role: number) {
        this.name = name
        this.location = location
        this.lang = lang
        this.role = role
    }
}
export default User
