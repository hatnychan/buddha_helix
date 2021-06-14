import User from '../../domain/entities/User'
import UserIdLink from '../../domain/entities/UserIdLink'
import IUserRepository from '../repositories/IUserRepository'
import IUserIdLinkRepository from '../repositories/IUserIdLinkRepository'
import { nonNullValidation } from '../../util/validation'

export class SaveUser {
    private userRepository: IUserRepository
    private userIdLinkRepository: IUserIdLinkRepository

    constructor(userRepository: IUserRepository, userIdLinkRepository: IUserIdLinkRepository) {
        this.userRepository = userRepository
        this.userIdLinkRepository = userIdLinkRepository
    }

    async execute(user: User, linkedIdName?: string, linkedId?: string): Promise<User> {
        const savedUser: User = (await this.userRepository.save(user).then((savedUser) => savedUser)) as User
        nonNullValidation(savedUser.id)
        if (linkedIdName && linkedId) {
            const newUserIdLink: UserIdLink = new UserIdLink(savedUser.id, linkedIdName, linkedId)
            newUserIdLink.user = savedUser
            await this.userIdLinkRepository.save(newUserIdLink)
        }
        return savedUser
    }
}
export default SaveUser
