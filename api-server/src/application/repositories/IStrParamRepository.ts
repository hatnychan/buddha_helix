import NumParam from '../../domain/entities/StrParam'

export abstract class IStrParamRepository {
    abstract find(cond: { [key: string]: string }): Promise<NumParam[]>
}
export default IStrParamRepository
