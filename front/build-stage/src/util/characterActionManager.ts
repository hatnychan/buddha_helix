import phaser from 'phaser'
import { SpriteLayer, SpriteObject } from '../classes/types'
import { numParam } from './api'

// グリッド移動
export const gridWalkTween = (
    phaserScene: phaser.Scene,
    target: phaser.GameObjects.Sprite,
    xDir: number,
    yDir: number,
    onComplete: () => void
): void => {
    const tween: phaser.Tweens.Tween = phaserScene.add.tween({
        // 対象のオブジェクト
        targets: [target],
        // X座標の移動を設定
        x: {
            getStart: (): number => target.x,
            getEnd: (): number => target.x + numParam.DISPLAY_TILE_MAP.SIZE * xDir
        },
        // X座標の移動を設定
        y: {
            getStart: (): number => target.y,
            getEnd: (): number => target.y + numParam.DISPLAY_TILE_MAP.SIZE * yDir
        },
        // アニメーションの時間
        duration: 300,
        // アニメーション終了時に発火するコールバック
        onComplete: () => {
            tween.stop() // Tweenオブジェクトの削除
            onComplete() // 引数の関数実行
        }
    })
}

export const characterWalking = (phaserScene: phaser.Scene, spriteLayer: SpriteLayer, animeCd: string): void => {
    const charaObj: SpriteObject = spriteLayer.get(animeCd) as SpriteObject
    if (charaObj.isAction) return
    let xDir = 0 // x座標の移動方向を表すための変数
    let yDir = 0 // y座標の移動方向を表すための変数
    const animState = charaObj.act[0]

    // ここで状態決定（ローカルな変数に格納）
    if (animState === 'walk_front') {
        yDir = -1
    } else if (animState === 'walk_back') {
        yDir = 1
    } else if (animState === 'walk_left') {
        xDir = -1
    } else if (animState === 'walk_right') {
        xDir = 1
    } else {
        return
    }
    charaObj.isAction = true

    // カメラの設定
    // const camera = phaserScene.cameras.main
    // camera.startFollow(charaObj.spriteObject)
    // camera.setBounds(0, 0, 1000, 1000)

    const charaNewTilePos: { tileX: number; tileY: number } = { tileX: charaObj.x + xDir, tileY: charaObj.y + yDir }
    charaObj.act.shift()
    charaObj.spriteObject.anims.play(animeCd + '_' + animState, false)
    gridWalkTween(phaserScene, charaObj.spriteObject, xDir, yDir, () => {
        spriteLayer.set(animeCd, {
            spriteObject: charaObj.spriteObject,
            x: charaNewTilePos.tileX,
            y: charaNewTilePos.tileY,
            act: charaObj.act,
            isAction: false
        })
    })
}

export const playCharacterAction = (phaserScene: phaser.Scene, spriteLayer: SpriteLayer): void => {
    for (const key of Array.from(spriteLayer.keys())) {
        const charaObj: SpriteObject = spriteLayer.get(key) as SpriteObject
        if (charaObj.act.length === 0) {
            charaObj.spriteObject.anims.stop()
            continue
        }

        characterWalking(phaserScene, spriteLayer, key)
    }
}

// // キャラクターの向いた先のタイル座標を取得
// private getNowCharaFaceTilePos(spriteLayerKey: string): TilePos | undefined {
//     if (this.gameState.isWalking) return undefined // 歩いていたら取得できないこととする

//     const baseTileMap: phaser.Tilemaps.StaticTilemapLayer = Array.from(this.tileMapLayer.values())[0]

//     const character: phaser.GameObjects.Sprite = (this.spriteLayer.get(spriteLayerKey) as SpriteObject).spriteObject
//     const lastAnim: WalkAnimState = character.anims.getCurrentKey() as WalkAnimState

//     const dir: { moveX: MoveDir; moveY: MoveDir } = { moveX: 0, moveY: 0 }
//     const characterPos: phaser.Math.Vector2 = baseTileMap.worldToTileXY(character.x, character.y)
//     const nowPos: TilePos = { tileX: characterPos.x, tileY: characterPos.y }

//     if (lastAnim == 'walk_front') {
//         // 手前に歩いていたら
//         dir.moveY = -1
//     } else if (lastAnim == 'walk_left') {
//         // 左に歩いていたら
//         dir.moveX = -1
//     } else if (lastAnim == 'walk_right') {
//         // 右に歩いていたら
//         dir.moveX = 1
//     } else if (lastAnim == 'walk_back') {
//         // 奥に歩いていたら
//         dir.moveY = 1
//     }

//     const facing: TilePos = {
//         tileX: nowPos.tileX + dir.moveX,
//         tileY: nowPos.tileY + dir.moveY
//     } // 現在座標から向いてる方向に応じて計算

//     return facing
// }
