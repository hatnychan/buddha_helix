import GameLog from '../../../../domain/entities/GameLog'
import IGameLogRepository from '../../../../application/repositories/IGameLogRepository'
import { Repository, getRepository } from 'typeorm'
import GameLogEntity from '../entities/GameLog'

export class GameLogRepository extends IGameLogRepository {
    private repository!: Repository<GameLog>

    /* 
    TODO 本当はgetRepositoryをメンバ変数やコンストラクターに入れたいんだけどエラーになってしまう。
    多分server.tsでcreateConnectionされる前に実行されてしまうためだと思う。解決策無いか調べてもよく分からん。
    各メソッド内でgetRepositoryすれば問題ないのでとりあえずsetRepositoryメソッドを作って実行するようにした。
    時間あればもっと良い方法を模索したい。
    */
    private setRepository(): void {
        if (!this.repository) this.repository = getRepository(GameLogEntity)
    }

    async find(cond: { [key: string]: string }): Promise<GameLog[]> {
        this.setRepository()
        // TODO キャッシュの情報はquery-result-cacheテーブルに保存される。でもポスグレに保存されるのはちょっと微妙かも。後で調査する
        const results: GameLog[] = await this.repository.find({
            where: cond,
            cache: true
        })
        return results
    }
}
export default GameLogRepository
