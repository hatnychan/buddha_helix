import NumParam from '../../../../domain/entities/NumParam'
import INumParamRepository from '../../../../application/repositories/INumParamRepository'
import { Repository, getRepository } from 'typeorm'
import NumParamEntity from '../entities/NumParam'

export class NumParamRepository extends INumParamRepository {
    private repository!: Repository<NumParam>

    private setRepository(): void {
        if (!this.repository) this.repository = getRepository(NumParamEntity)
    }

    async find(cond: { [key: string]: string }): Promise<NumParam[]> {
        this.setRepository()
        const results: NumParam[] = await this.repository.find({ where: cond, cache: true })
        return results
    }
}
export default NumParamRepository
