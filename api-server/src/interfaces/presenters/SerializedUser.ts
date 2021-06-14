import User from '../../domain/entities/User'

export class SerializedUser {
    name: string

    location: string

    lang: string

    constructor(user: User) {
        this.name = user.name
        this.location = user.location
        this.lang = user.lang
    }
}
export default SerializedUser
