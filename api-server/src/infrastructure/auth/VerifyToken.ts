/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import User from '../../domain/entities/User'
import IUserRepository from '../../application/repositories/IUserRepository'
import IUserIdLinkRepository from '../../application/repositories/IUserIdLinkRepository'
import { nonNullValidation } from '../../util/validation'
import FindOneUser from '../../application/usecases/FindOneUser'
import SaveUser from '../../application/usecases/SaveUser'

export class VerifyToken {
    private userRepository: IUserRepository
    private userIdLinkRepository: IUserIdLinkRepository
    private admin: any

    constructor(userRepository: IUserRepository, userIdLinkRepository: IUserIdLinkRepository, admin: any) {
        this.userRepository = userRepository
        this.userIdLinkRepository = userIdLinkRepository
        this.admin = admin
    }

    async execute(req: any, res: any): Promise<void> {
        try {
            nonNullValidation(req.headers.authorization)
            const idToken: string = req.headers.authorization
            const { uid } = await this.admin.auth().verifyIdToken(idToken)
            nonNullValidation(uid)
            const findOneUser = new FindOneUser(this.userRepository, this.userIdLinkRepository)
            const reqUser: User | undefined = await findOneUser.execute({ linkedId: uid as string })
            // 既にDBにユーザー登録がある場合
            if (reqUser) {
                req.user = reqUser
            } else {
                // DBに存在しない場合、新規登録する。
                const tempName = '${initName}'
                const tempUser: User = new User(tempName, 'TOKYO', 'ja', 1)
                const saveUser = new SaveUser(this.userRepository, this.userIdLinkRepository)
                const savedUser = await saveUser.execute(tempUser, 'firebase_uid', uid)
                req.user = savedUser
            }
        } catch (err) {
            console.error(err)
            res.status(403).send('Unauthorized')
        }
    }
}
export default VerifyToken

// coockie使う場合
// nonNullValidation(req.cookies)
// nonNullValidation(req.cookies.__session)
// const idToken: string = req.cookies.__session
