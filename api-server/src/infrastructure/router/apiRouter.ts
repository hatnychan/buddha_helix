import express from 'express'
import ParamController from '../../interfaces/controllers/ParamController'
import NumParamRepository from '../datasource/database/repositories/NumParamRepository'
import StrParamRepository from '../datasource/database/repositories/StrParamRepository'
import GameLogController from '../../interfaces/controllers/GameLogController'
import GameLogRepository from '../datasource/database/repositories/GameLogRepository'
import UserController from '../../interfaces/controllers/UserController'
import UserRepository from '../datasource/database/repositories/UserRepository'
import UserIdLinkRepository from '../datasource/database/repositories/UserIdLinkRepository'

const router: express.Router = express.Router()
const numParamRepository = new NumParamRepository()
const strParamRepository = new StrParamRepository()
const gameLogRepository = new GameLogRepository()
const userRepository = new UserRepository()
const userIdLinkRepository = new UserIdLinkRepository()

const paramController = new ParamController(numParamRepository, strParamRepository)
const gameLogController = new GameLogController(gameLogRepository)
const userController = new UserController(userRepository, userIdLinkRepository)

router.get('/numParam', async (req: express.Request, res: express.Response) => {
    const resData = await paramController.findAllNumParam(req)
    res.json(resData)
})

router.get('/strParam', async (req: express.Request, res: express.Response) => {
    const resData = await paramController.findAllStrParam(req)
    res.json(resData)
})

router.post('/gameLog', async (req: express.Request, res: express.Response) => {
    const resData = await gameLogController.findGameLog(req)
    res.json(resData)
})

router.get('/reqUser', async (req: express.Request, res: express.Response) => {
    const resData = await userController.findRequestUser(req)
    res.json(resData)
})

router.post('/saveReqUser', async (req: express.Request, res: express.Response) => {
    await userController.saveRequestUser(req)
    res.sendStatus(200)
})

router.get('/deleteReqUser', async (req: express.Request, res: express.Response) => {
    await userController.deleteRequestUser(req)
    res.sendStatus(200)
})

export default router
