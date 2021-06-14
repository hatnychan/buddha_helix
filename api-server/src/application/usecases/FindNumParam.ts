import NumParam from '../../domain/entities/NumParam'
import INumParamRepository from '../repositories/INumParamRepository'

export class FindNumParam {
    private numParamRepository: INumParamRepository

    constructor(numParamRepository: INumParamRepository) {
        this.numParamRepository = numParamRepository
    }

    async execute(cond: { [key: string]: string }): Promise<NumParam[]> {
        const results: NumParam[] = await this.numParamRepository.find(cond)
        return results
    }
}
export default FindNumParam
