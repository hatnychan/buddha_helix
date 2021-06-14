// BootstrapのJavaScript側の機能を読み込む
import 'bootstrap'
// スタイルシートを読み込む
import './style.scss'

import phaser from 'phaser'
import { api, numParam } from './util/api'
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { PlayScene } from './scenes/PlayScene'

//空のcanvas要素作成
const canvas = document.createElement('canvas')
const gameContainer = document.getElementById('game-screen')
gameContainer?.appendChild(canvas)

// クリック時の演出
const body: HTMLElement = document.body as HTMLElement
body.addEventListener('click', (e) => {
    body.insertAdjacentHTML('afterbegin', '<a href="#" id="click-effect" class="ripple"></a>')
    const clickEffect: HTMLElement = document.getElementById('click-effect') as HTMLElement
    const clickEffectCss: CSSStyleDeclaration = getComputedStyle(clickEffect, null)
    const clickEffectW = Number(clickEffectCss.getPropertyValue('width').replace('px', ''))
    const clickEffectH = Number(clickEffectCss.getPropertyValue('height').replace('px', ''))
    clickEffect.style.left = e.pageX - clickEffectW / 2 + 'px'
    clickEffect.style.top = e.pageY - clickEffectH / 2 + 'px'
    const clickEffectDur = Number(clickEffectCss.getPropertyValue('animation-duration').replace('s', ''))
    setTimeout(() => {
        clickEffect.remove()
    }, clickEffectDur * 1000)
})

const gameStart = async (): Promise<void> => {
    // 初期データ取得
    await api.findAllNumParam()
    await api.findAllStrParam()
    await api.findGameLog({ code: 'COMMON' })
    await api.findCurrentUser()

    // スクリーンサイズパラメータ抽出
    const width = numParam.SCREEN.WIDTH_SIZE
    const height = numParam.SCREEN.HEIGHT_SIZE

    // シーン描画 ここに必要なものを追加しないとthis.physicsなどが使えない
    new phaser.Game({
        scene: [LoadScene, MenuScene, PlayScene],
        type: phaser.CANVAS, // これを追加しないとcanvas要素に描画できない
        canvas: canvas,
        render: { pixelArt: true },
        physics: {
            // ここにphysicsを追加しないとthis.physicsなどが使えない
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scale: {
            mode: phaser.Scale.FIT,
            parent: 'game-screen',
            width: width,
            height: height
        }
    })
}
gameStart()
