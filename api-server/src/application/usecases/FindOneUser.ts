import User from '../../domain/entities/User'
import UserIdLink from '../../domain/entities/UserIdLink'
import IUserRepository from '../repositories/IUserRepository'
import IUserIdLinkRepository from '../repositories/IUserIdLinkRepository'
import { nonNullValidation } from '../../util/validation'

export class FindOneUser {
    private userRepository: IUserRepository
    private userIdLinkRepository: IUserIdLinkRepository

    constructor(userRepository: IUserRepository, userIdLinkRepository: IUserIdLinkRepository) {
        this.userRepository = userRepository
        this.userIdLinkRepository = userIdLinkRepository
    }

    async execute(cond: { [key: string]: string | number }): Promise<User | undefined> {
        let userId: number | undefined
        if (cond.linkedId) {
            const linkedId = String(cond.linkedId)
            const userIdLink: UserIdLink | undefined = await this.userIdLinkRepository.findOne({ linkedId: linkedId })
            if (!userIdLink) return
            userId = userIdLink.id as number
        } else if (cond.userId) {
            userId = Number(cond.userId)
        }
        nonNullValidation(userId)
        const result = await this.userRepository.findOne({ id: userId })
        return result
    }
}
export default FindOneUser
