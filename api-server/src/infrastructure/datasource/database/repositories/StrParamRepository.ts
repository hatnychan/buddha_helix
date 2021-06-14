import StrParam from '../../../../domain/entities/StrParam'
import IStrParamRepository from '../../../../application/repositories/IStrParamRepository'
import { Repository, getRepository } from 'typeorm'
import StrParamEntity from '../entities/StrParam'

export class StrParamRepository extends IStrParamRepository {
    private repository!: Repository<StrParam>

    private setRepository(): void {
        if (!this.repository) this.repository = getRepository(StrParamEntity)
    }

    async find(cond: { [key: string]: string }): Promise<StrParam[]> {
        this.setRepository()
        const results: StrParam[] = await this.repository.find({ where: cond, cache: true })
        return results
    }
}
export default StrParamRepository
