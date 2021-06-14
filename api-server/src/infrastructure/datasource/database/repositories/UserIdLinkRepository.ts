import UserIdLink from '../../../../domain/entities/UserIdLink'
import IUserIdLinkRepository from '../../../../application/repositories/IUserIdLinkRepository'
import { Repository, getRepository } from 'typeorm'
import UserIdLinkEntity from '../entities/UserIdLink'

export class UserIdLinkRepository extends IUserIdLinkRepository {
    private repository!: Repository<UserIdLink>

    private setRepository(): void {
        if (!this.repository) this.repository = getRepository(UserIdLinkEntity)
    }

    async findOne(cond: { [key: string]: string | number }): Promise<UserIdLink | undefined> {
        this.setRepository()
        const result: UserIdLink | undefined = await this.repository.findOne({
            where: cond,
            relations: ['user']
            // cache: true
        })
        return result
    }

    async save(userIdLink: UserIdLink): Promise<UserIdLink> {
        this.setRepository()
        const ret = this.repository.save(userIdLink)
        return ret
    }
}
export default UserIdLinkRepository
