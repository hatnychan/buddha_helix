/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import phaser from 'phaser'
import { MapData, SpriteData } from '../classes/types'
import { GameState } from '../classes/GameState'
import { outputGameLog } from '../util/common'
import { api, gameLog, strParam } from '../util/api'

export class LoadScene extends phaser.Scene {
    // ゲーム状態
    private gameState: GameState = GameState.instance

    constructor() {
        super({
            key: 'LOAD'
        })
    }

    init(): void {
        console.log('init')
        const commonGameLog = gameLog.COMMON
        if (this.gameState.scene === 'PLAY') outputGameLog(commonGameLog.READY_TO_CONSTRUCT)
        this.preload(true)
    }

    preload(isPreFuncComplete = false): void {
        if (!isPreFuncComplete) return
        console.log('preload')
        this.create(undefined, true)
    }

    async create(data: any, isPreFuncComplete = false): Promise<void> {
        if (!isPreFuncComplete) return
        console.log('create')

        await Promise.all([this.loadMaps(this), this.loadSprites(this)])
        this.loadImages(this) // TODO 先にawaitのloadをしないと認識されない(setPathが悪さをしている？)
        this.loadAudio(this) // 先にawaitのloadをしないと認識されない
        this.load.start()

        const loadingBar: phaser.GameObjects.Graphics = this.add.graphics({
            fillStyle: { color: 0xffffff }
        })

        this.load.on('progress', (percent: number) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            console.log('complete')
            this.scene.start(this.gameState.scene, undefined).remove('LOAD')
        })

        this.load.on('load', (file: phaser.Loader.File) => {
            console.log(file.src)
        })

        // ロードするものが無いとcompleteが発火しないのでローディング中でないステータスで発火させる。
        const isLoading = this.load.isLoading()
        if (!isLoading) {
            console.log('does not exist load assets')
            this.scene.start(this.gameState.scene, undefined).remove('LOAD')
        }
    }

    private loadImages = (phaserScene: phaser.Scene): void => {
        phaserScene.load.setPath('./assets/image')
        for (const key in strParam.ASSETS_IMAGE) {
            phaserScene.load.image(key, strParam.ASSETS_IMAGE[key])
        }
    }

    private loadMaps = async (phaserScene: phaser.Scene): Promise<void> => {
        const mapData: MapData = await api.findMapData()
        phaserScene.load.setPath('./assets/maps') // awaitの上だとsetPathがうまく設定されない
        const mapImage = mapData[0]
        for (const key in mapImage) {
            phaserScene.load.image(key, mapImage[key])
        }
    }

    private loadAudio = (phaserScene: phaser.Scene): void => {
        phaserScene.load.setPath('./assets/audio')
        for (const key in strParam.ASSETS_AUDIO) {
            phaserScene.load.audio(key, strParam.ASSETS_AUDIO[key])
        }
    }

    private loadSprites = async (phaserScene: phaser.Scene): Promise<void> => {
        // TODO ここではgetSpriteDataの画像データだけあれば良いからキャラクターの行動アルゴリズムが動かないようにする
        const spriteData: SpriteData = await api.findSpriteData()
        phaserScene.load.setPath('./assets/sprite') // awaitの上だとsetPathがうまく設定されない
        const spriteConfig = spriteData[0]
        for (const sprite of spriteConfig) {
            phaserScene.load.spritesheet(sprite.animeCd, sprite.texture, {
                frameWidth: sprite.width,
                frameHeight: sprite.height
            })
        }
    }
}
