import UserIdLink from '../../domain/entities/UserIdLink'

export abstract class IUserIdLinkRepository {
    abstract findOne(cond: { [key: string]: string | number }): Promise<UserIdLink | undefined>
    abstract save(UserIdLink: UserIdLink): Promise<UserIdLink>
}
export default IUserIdLinkRepository
