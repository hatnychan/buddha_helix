import User from '../../domain/entities/User'

export abstract class IUserRepository {
    abstract findOne(cond: { [key: string]: string | number }): Promise<User | undefined>
    abstract save(user: User): Promise<User>
    abstract delete(cond: { [key: string]: string | number }): Promise<void>
}
export default IUserRepository
