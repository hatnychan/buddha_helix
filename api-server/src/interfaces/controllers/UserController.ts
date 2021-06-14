/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../../domain/entities/User'
import IUserRepository from '../../application/repositories/IUserRepository'
import IUserIdLinkRepository from '../../application/repositories/IUserIdLinkRepository'
import SaveUser from '../../application/usecases/SaveUser'
import DeleteUser from '../../application/usecases/DeleteUser'
import SerializedUser from '../presenters/SerializedUser'
import { nonNullValidation } from '../../util/validation'

export class UserController {
    private UserRepository: IUserRepository
    private userIdLinkRepository: IUserIdLinkRepository

    constructor(UserRepository: IUserRepository, userIdLinkRepository: IUserIdLinkRepository) {
        this.UserRepository = UserRepository
        this.userIdLinkRepository = userIdLinkRepository
    }

    async findRequestUser(req: any): Promise<SerializedUser> {
        const reqUser: User = req.user
        const serializedReqUser = new SerializedUser(reqUser)
        return serializedReqUser
    }

    async saveRequestUser(req: any): Promise<void> {
        const user = req.user as User
        const newSerializedUser = req.body as SerializedUser
        user.name = newSerializedUser.name
        user.location = newSerializedUser.location
        user.lang = newSerializedUser.lang
        const saveUser: SaveUser = new SaveUser(this.UserRepository, this.userIdLinkRepository)
        await saveUser.execute(user)
    }

    async deleteRequestUser(req: any): Promise<void> {
        const user = req.user as User
        const deleteUser: DeleteUser = new DeleteUser(this.UserRepository)
        nonNullValidation(user.id)
        const cond = { id: user.id }
        await deleteUser.execute(cond)
    }
}
export default UserController
