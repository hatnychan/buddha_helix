import NumParam from '../../domain/entities/NumParam'

export class SerializedNumParam {
    [cd: string]: {
        [key: string]: number
    }

    constructor(numParamArray: NumParam[]) {
        numParamArray.forEach((numParam) => {
            if (!this[numParam.code]) this[numParam.code] = {}
            this[numParam.code][numParam.key] = numParam.value
        })
    }
}
export default SerializedNumParam

// NumParam[]を下記のような構造に変える。
// {
//     SCREEN(メンバ変数) = {
//         WIDTH_SIZE: 800,
//         HEIGHT_SIZE: 600
//     },
//     DISPLAY_TILE_MAP(メンバ変数) = {
//         SIZE: 40
//     }
// }
