import StrParam from '../../domain/entities/StrParam'
import IStrParamRepository from '../repositories/IStrParamRepository'

export class FindStrParam {
    private strParamRepository: IStrParamRepository

    constructor(strParamRepository: IStrParamRepository) {
        this.strParamRepository = strParamRepository
    }

    async execute(cond: { [key: string]: string }): Promise<StrParam[]> {
        const results: StrParam[] = await this.strParamRepository.find(cond)
        return results
    }
}
export default FindStrParam
