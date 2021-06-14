import IUserRepository from '../repositories/IUserRepository'

export class DeleteUser {
    private userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(cond: { [key: string]: string | number }): Promise<void> {
        await this.userRepository.delete(cond)
    }
}
export default DeleteUser
