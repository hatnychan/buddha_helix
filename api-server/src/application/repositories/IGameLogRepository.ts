import GameLog from '../../domain/entities/GameLog'

export abstract class IGameLogRepository {
    abstract find(cond: { [key: string]: string }): Promise<GameLog[]>
}
export default IGameLogRepository
