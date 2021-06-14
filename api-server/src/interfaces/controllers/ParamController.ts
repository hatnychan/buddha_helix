/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import NumParam from '../../domain/entities/NumParam'
import StrParam from '../../domain/entities/StrParam'
import FindAllNumParam from '../../application/usecases/FindNumParam'
import FindAllStrParam from '../../application/usecases/FindStrParam'
import INumParamRepository from '../../application/repositories/INumParamRepository'
import IStrParamRepository from '../../application/repositories/IStrParamRepository'
import SerializedNumParam from '../presenters/SerializedNumParam'
import SerializedStrParam from '../presenters/SerializedStrParam'

export class ParamController {
    private numParamRepository: INumParamRepository
    private strParamRepository: IStrParamRepository

    constructor(numParamRepository: INumParamRepository, strParamRepository: IStrParamRepository) {
        this.numParamRepository = numParamRepository
        this.strParamRepository = strParamRepository
    }

    async findAllStrParam(req: any): Promise<SerializedStrParam> {
        const findAllStrParam: FindAllStrParam = new FindAllStrParam(this.strParamRepository)
        const result: StrParam[] = await findAllStrParam.execute({})
        const ret: SerializedStrParam = new SerializedStrParam(result)
        return ret
    }

    async findAllNumParam(req: any): Promise<SerializedNumParam> {
        const findAllNumParam: FindAllNumParam = new FindAllNumParam(this.numParamRepository)
        const result: NumParam[] = await findAllNumParam.execute({})
        const ret: SerializedNumParam = new SerializedNumParam(result)
        return ret
    }
}
export default ParamController
