import express from 'express'
import Admin from 'firebase-admin'
import VerifyToken from '../auth/VerifyToken'
import UserRepository from '../datasource/database/repositories/UserRepository'
import UserIdLinkRepository from '../datasource/database/repositories/UserIdLinkRepository'

const admin = Admin.initializeApp()
const userRepository = new UserRepository()
const userIdLinkRepository = new UserIdLinkRepository()
const verifyToken = new VerifyToken(userRepository, userIdLinkRepository, admin)

export const auth = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    await verifyToken.execute(req, res)
    next()
}
