import { get, post } from '../plugins/http'
import { auth } from '../plugins/auth'
import * as type from '../classes/types'
import { GameState } from '../classes/GameState'

// パラメータデータ取得
export let numParam: type.SerializedNumParam
export let strParam: type.SerializedStrParam
export let gameLog: type.SerializedGameLog
export let sesUser: type.User
export const api = {
    async findAllNumParam(): Promise<type.SerializedNumParam> {
        if (numParam) return numParam
        const res = await get('/numParam')
        numParam = res.data
        return numParam
    },

    async findAllStrParam(): Promise<type.SerializedStrParam> {
        if (strParam) return strParam
        const res = await get('/strParam')
        strParam = res.data
        return strParam
    },

    async findGameLog(cond: { [key: string]: string }): Promise<type.SerializedGameLog> {
        if (gameLog && cond.code in gameLog) return gameLog
        const res = await post('/gameLog', cond)
        if (!gameLog) {
            gameLog = res.data
        } else {
            gameLog[cond.code] = res.data[cond.code]
        }
        return gameLog
    },

    async findCurrentUser(): Promise<type.User> {
        const res = await get('/reqUser')
        sesUser = res.data
        return res.data
    },

    async saveCurrentUser(currentUser: type.User): Promise<number> {
        const res = await post('/saveReqUser', currentUser)
        return res.status
    },

    async linkWithProvider(providerName: string): Promise<void> {
        await auth.linkWithProvider(providerName)
    },

    async loginWithProvider(providerName: string): Promise<void> {
        await auth.loginWithProvider(providerName)
    },

    async logout(): Promise<void> {
        await auth.logout()
    },

    async deleteSesUser(): Promise<void> {
        await get('/deleteReqUser')
        await auth.deleteSesUser()
    },

    async isAnonymous(): Promise<boolean> {
        const res = await auth.isAnonymous()
        return res
    },

    async findMapData(): Promise<type.MapData> {
        const data: type.MapData = mapData
        return new Promise((resolve) => resolve(data))
    },

    async findSpriteData(): Promise<type.SpriteData> {
        let data: type.SpriteData
        const gameState: GameState = GameState.instance
        if (gameState.scene === 'MENU') {
            data = spriteDataMenu
        } else if (gameState.scene === 'PLAY') {
            const aaa = characterActionAlgo()
            console.log(aaa.cumUtilityMap)
            console.log(aaa.actArray)
            spriteDataPlay[1][0].act = aaa.actArray
            data = spriteDataPlay
        }
        return new Promise((resolve) => resolve(data))
    }
}

// userデータを元に絞る 上下左右のマップ情報も
// blankレイヤーの配列とその配列番号に対応するmapId配列 blankレイヤーにふれると対応するmapIdが発火
const mapData: type.MapData = [
    {
        NPC: 'npc.png',
        TILE: 'map_tile.png',
        COMMON: 'common.png'
    },
    {
        mapId: 'field1',
        tilePos: new Map([
            [
                'TILE',
                [
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
                    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                    [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            ],
            [
                'NPC',
                [
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            ]
        ]),
        eventPos: new Map([
            [
                'field2',
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
                ]
            ],
            [
                'field3',
                [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ]
            ]
        ])
    }
]

// userデータを元に絞る texture、width、heightはシステムパラメータから取得
const spriteDataMenu: type.SpriteData = [
    [
        {
            animeCd: 'CAT1',
            animeKey: ['walk_back', 'walk_left', 'walk_right', 'walk_front'],
            texture: 'cat.png',
            width: 32,
            height: 32
        }
    ],
    [
        {
            initAnimeCd: 'CAT1',
            initFrame: 0,
            initX: 100,
            initY: 100,
            act: []
        }
    ]
]

// 後にキャラのスピードデータも入れる。スピードが高いほどmapオブジェクトの後ろに格納される
const spriteDataPlay: type.SpriteData = [
    [
        // {
        //     animeCd: 'ANN1',
        //     animeKey: ['walk_front', 'walk_left', 'walk_back', 'walk_right'],
        //     texture: 'anna.png',
        //     width: 64,
        //     height: 64
        // },
        {
            animeCd: 'EYEBALL1',
            animeKey: ['walk_front', 'walk_left', 'walk_back', 'walk_right'],
            texture: 'eyeball.png',
            width: 32,
            height: 38
        }
    ],
    [
        // {
        //     initAnimeCd: 'ANN1',
        //     initFrame: 18,
        //     initX: 10,
        //     initY: 8,
        //     act: []
        // },
        {
            initAnimeCd: 'EYEBALL1',
            initFrame: 3,
            initX: 0,
            initY: 14,
            act: ['walk_right', 'walk_right', 'walk_right', 'walk_right', 'walk_right']
        }
    ]
]

// 効用計算予定のタイルをtoCalcArrayに格納する。既に存在する座標のタイルならば前回累積効用が小さい方を採用する
const addNextTiletoArray = (
    cumUtilityMap: number[][],
    x: number,
    y: number,
    cumUtility: number,
    toCalcArray: { map: number; x: number; y: number; preCumUtility: number }[]
): void => {
    if (cumUtilityMap[y] && cumUtilityMap[y][x] === 0) {
        const nextUtilityTile = { map: cumUtilityMap[y][x], x: x, y: y, preCumUtility: cumUtility }
        const existtoCalcArray = toCalcArray.filter((nut) => nut.y === y && nut.x === x)

        if (existtoCalcArray.length === 0) {
            toCalcArray.push(nextUtilityTile)
        } else if (existtoCalcArray[0].preCumUtility > cumUtility) {
            const exIndex = toCalcArray.indexOf(existtoCalcArray[0])
            toCalcArray[exIndex] = nextUtilityTile
        }
    }
}

// NPC行動アルゴリズム
// TODO 立ち止まる制御は未実装
const characterActionAlgo = (): { cumUtilityMap: number[][]; actArray: string[] } => {
    const start = { x: 0, y: 14 }
    const goal = { x: 5, y: 0 }
    const cumUtilityMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    const tileMap = JSON.parse(JSON.stringify(mapData[1].tilePos.get('TILE') as number[][]))
    tileMap[0][1] = 3
    tileMap[0][2] = 3
    tileMap[0][3] = 3
    tileMap[0][4] = 3
    tileMap[1][1] = 3
    tileMap[2][1] = 3
    tileMap[3][1] = 3
    tileMap[4][1] = 3
    tileMap[5][1] = 3
    tileMap[6][1] = 3
    tileMap[7][1] = 3
    tileMap[9][1] = 3
    tileMap[10][1] = 3
    tileMap[11][1] = 3

    const charaUtilityCoeff = { time: 1, labor: 1 }
    const tileDataDic = new Map([
        [0, { time: 1, labor: 1 }],
        [1, { time: 15, labor: 15 }],
        [3, { time: 0.01, labor: 0.01 }]
    ])

    const baseTileData = { time: 1, labor: 1 }
    const baseUtility = charaUtilityCoeff.time * baseTileData.time + charaUtilityCoeff.labor * baseTileData.labor
    const toCalcArray = [{ map: cumUtilityMap[goal.y][goal.x], x: goal.x, y: goal.y, preCumUtility: 0 }]
    let isUtilityLoop = true
    while (isUtilityLoop) {
        const currentDeductTile = toCalcArray[0]
        const x = currentDeductTile.x
        const y = currentDeductTile.y
        const preCumUtility = currentDeductTile.preCumUtility

        // 累積効用の計算
        const tile = tileMap[y][x]
        const tileData = tileDataDic.get(tile) as { time: number; labor: number }
        const utility = charaUtilityCoeff.time * tileData.time + charaUtilityCoeff.labor * tileData.labor
        const cumUtility = preCumUtility + utility / baseUtility
        cumUtilityMap[y][x] = cumUtility

        // ゴールとその四方のタイルがすべて計算されれば計算終了
        const endCond1 = cumUtilityMap[start.y][start.x] > 0
        const endCond2 = !cumUtilityMap[start.y - 1] || cumUtilityMap[start.y - 1][start.x] > 0
        const endCond3 = !cumUtilityMap[start.y + 1] || cumUtilityMap[start.y + 1][start.x] > 0
        const endCond4 = !cumUtilityMap[start.y][start.x - 1] || cumUtilityMap[start.y][start.x - 1] > 0
        const endCond5 = !cumUtilityMap[start.y][start.x + 1] || cumUtilityMap[start.y][start.x + 1] > 0
        if (endCond1 && endCond2 && endCond3 && endCond4 && endCond5) isUtilityLoop = false

        // 四方のタイルを次回計算予定配列に入れる
        addNextTiletoArray(cumUtilityMap, x - 1, y, cumUtility, toCalcArray)
        addNextTiletoArray(cumUtilityMap, x + 1, y, cumUtility, toCalcArray)
        addNextTiletoArray(cumUtilityMap, x, y - 1, cumUtility, toCalcArray)
        addNextTiletoArray(cumUtilityMap, x, y + 1, cumUtility, toCalcArray)

        toCalcArray.shift()
        toCalcArray.sort((a, b) => (a.preCumUtility > b.preCumUtility ? 1 : a.preCumUtility < b.preCumUtility ? -1 : 0))
        //console.log('y=' + y + ' x=' + x + ' cumUt=' + cumUtility + ' preCumUt=' + preCumUtility)
        //console.log('###############################')
    }

    // 上の処理で作成した効用マップを行動配列に変換する。
    const actArray = []
    let currentAct = { utility: cumUtilityMap[start.y][start.x], x: start.x, y: start.y, act: '' }
    let isActLoop = true
    while (isActLoop) {
        const x = currentAct.x
        const y = currentAct.y
        currentAct = { utility: cumUtilityMap[y][x], x: x, y: y, act: '' }

        const minUtility = [currentAct]
        if (cumUtilityMap[y][x - 1])
            minUtility.push({ utility: cumUtilityMap[y][x - 1], x: x - 1, y: y, act: 'walk_left' })
        if (cumUtilityMap[y][x + 1])
            minUtility.push({ utility: cumUtilityMap[y][x + 1], x: x + 1, y: y, act: 'walk_right' })
        if (cumUtilityMap[y - 1])
            minUtility.push({ utility: cumUtilityMap[y - 1][x], x: x, y: y - 1, act: 'walk_front' })
        if (cumUtilityMap[y + 1])
            minUtility.push({ utility: cumUtilityMap[y + 1][x], x: x, y: y + 1, act: 'walk_back' })

        const nextAct = minUtility.reduce((a, b) => (a.utility < b.utility ? a : b))
        if (nextAct.act != '') actArray.push(nextAct.act)
        else isActLoop = false

        currentAct = nextAct
    }
    return { cumUtilityMap: cumUtilityMap, actArray: actArray }
}
