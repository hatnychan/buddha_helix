/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import User from '../../domain/entities/User'
import GameLog from '../../domain/entities/GameLog'
import FindGameLog from '../../application/usecases/FindGameLog'
import IGameLogRepository from '../../application/repositories/IGameLogRepository'
import SerializedGameLog from '../presenters/SerializedGameLog'

export class GameLogController {
    private gameLogRepository: IGameLogRepository

    constructor(gameLogRepository: IGameLogRepository) {
        this.gameLogRepository = gameLogRepository
    }

    async findGameLog(req: any): Promise<SerializedGameLog> {
        const reqUser: User = req.user
        const cond: { [key: string]: string } = req.body
        cond['lang'] = reqUser.lang
        const findGameLog: FindGameLog = new FindGameLog(this.gameLogRepository)
        const results: GameLog[] = await findGameLog.execute(cond)
        const ret: SerializedGameLog = new SerializedGameLog(results)
        return ret
    }
}
export default GameLogController
