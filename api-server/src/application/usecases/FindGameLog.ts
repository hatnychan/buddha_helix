import GameLog from '../../domain/entities/GameLog'
import IGameLogRepository from '../repositories/IGameLogRepository'

export class FindGameLog {
    private gameLogRepository: IGameLogRepository

    constructor(gameLogRepository: IGameLogRepository) {
        this.gameLogRepository = gameLogRepository
    }

    async execute(cond: { [key: string]: string }): Promise<GameLog[]> {
        const results: GameLog[] = await this.gameLogRepository.find(cond)
        return results
    }
}
export default FindGameLog
