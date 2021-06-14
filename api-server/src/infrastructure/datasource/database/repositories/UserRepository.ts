import User from '../../../../domain/entities/User'
import IUserRepository from '../../../../application/repositories/IUserRepository'
import { Repository, getRepository } from 'typeorm'
import UserEntity from '../entities/User'

export class UserRepository extends IUserRepository {
    private repository!: Repository<User>

    private setRepository(): void {
        if (!this.repository) this.repository = getRepository(UserEntity)
    }

    async findOne(cond: { [key: string]: string | number }): Promise<User | undefined> {
        this.setRepository()
        const result: User | undefined = await this.repository.findOne({
            where: cond,
            relations: ['userIdLink']
            // cache: true
        })
        return result
    }

    async save(user: User): Promise<User> {
        this.setRepository()
        const ret = this.repository.save(user)
        return ret
    }

    async delete(cond: { [key: string]: string | number }): Promise<void> {
        this.setRepository()
        this.repository.delete(cond)
    }
}
export default UserRepository
