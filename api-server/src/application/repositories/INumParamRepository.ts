import NumParam from '../../domain/entities/NumParam'

export abstract class INumParamRepository {
    abstract find(cond: { [key: string]: string }): Promise<NumParam[]>
}
export default INumParamRepository
