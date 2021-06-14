import GameLog from '../../domain/entities/GameLog'

export class SerializedGameLog {
    [cd: string]: {
        [key: string]: string
    }

    constructor(gameLogArray: GameLog[]) {
        gameLogArray.forEach((gameLog) => {
            if (!this[gameLog.code]) this[gameLog.code] = {}
            this[gameLog.code][gameLog.key] = gameLog.value
        })
    }
}
export default SerializedGameLog

// GameLog[]を下記のような構造に変える。
// {
//     COMMON(メンバ変数) = {
//         WELCOME: 'ようこそ。世界へ。',
//         READY_TO_CONSTRUCT: '世界を構築する準備をしています。',
//         WORLD_HAS_CONSTRUCT: '世界は構築されました。',
//         WEATHER_CROUDY: '雲が空を覆っている。'
//     },
//     XYZ(メンバ変数) = {
//       AAA: 'うにゃうにゃ',
//       BBB: 'ほにゃほにゃ'
//     }
// }
