/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import phaser from 'phaser'
// TODO: @types/bootstrap@5.0.0がリリースされたらはずす
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Modal } from 'bootstrap'
import { createSpriteObject } from '../util/gameObjectManager'
import { outputGameLog, replaceText } from '../util/common'
import { LoadScene } from './LoadScene'
import * as type from '../classes/types'
import { api, gameLog, sesUser } from '../util/api'
import { getUserSignUpModal, getAuthWithModal, getOptionModal } from '../util/common'
import { GameState } from '../classes/GameState'

const modalElement: HTMLElement = document.getElementById('modal') as HTMLElement
export class MenuScene extends phaser.Scene {
    // ゲーム状態
    private gameState: GameState = GameState.instance
    private spriteLayer: type.SpriteLayer = new Map()

    constructor() {
        super({
            key: 'MENU'
        })
    }

    // TODO 各シーンはinit()→preload()→create()の順番に実行されていくが、完了を待って実行されるわけではないので
    // 関数の中にpromiseなものが入っていると終了する順番が前後してしまう。ので、同期で処理が実行されるように
    // 完了フラグを持たせるなどして工夫する必要がある。調べた限りはこれしか方法は無いが、もっと良い案あれば変えたい。
    // 似たような悩みを持つ人： https://phaser.discourse.group/t/scene-event-after-create-has-completed/3615
    // (↑の人はload.json()使う方法で納得しているけど、load.json()はgetは出来るけど、postはできないんだよね〜)
    init(): void {
        console.log('init')
        const commonGameLog = gameLog.COMMON
        outputGameLog(commonGameLog.WELCOME)
        if (sesUser.name != '${initName}') {
            const helloUser: string = replaceText(commonGameLog.HELLO_USER, sesUser.name)
            outputGameLog(helloUser)
        }
        this.preload(true)
    }

    preload(isPreFuncComplete = false): void {
        if (!isPreFuncComplete) return
        console.log('preload')
        this.create(undefined, true)
    }

    async create(data?: any, isPreFuncComplete = false): Promise<void> {
        if (!isPreFuncComplete) return
        console.log('create')
        this.add.image(0, 0, 'TITLE').setOrigin(0)

        // this.add.image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.2, 'LOGO').setDepth(1)
        // const enterButton: phaser.GameObjects.Image = this.add.image(
        //     this.game.renderer.width * 0.5,
        //     this.game.renderer.height * 0.5,
        //     'PLAY'
        // )
        // const optionsButton: phaser.GameObjects.Image = this.add
        //     .image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.5 + 100, 'OPTIONS')
        //     .setDepth(1)

        const logo: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.3,
            'BUDDHA.HELIX',
            {
                fontSize: '80px',
                color: 'white'
            }
        )
        logo.setOrigin(0.5)

        const enterButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5,
            '<ENTER>',
            {
                fontSize: '35px',
                color: 'white'
            }
        )
        enterButton.setOrigin(0.5)

        const loginButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5 + 80,
            '<LOGIN>',
            {
                fontSize: '35px',
                color: 'white'
            }
        )
        loginButton.setOrigin(0.5)

        const linkButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5 + 160,
            '<LINK>',
            {
                fontSize: '39px',
                color: 'white'
            }
        )
        linkButton.setOrigin(0.5)

        const optionsButton: phaser.GameObjects.Text = this.add.text(
            this.game.renderer.width * 0.5,
            this.game.renderer.height * 0.5 + 240,
            '<OPTIONS>',
            {
                fontSize: '27px',
                color: 'white'
            }
        )
        optionsButton.setOrigin(0.5)

        // 新規登録画面を表示
        if (sesUser.name === '${initName}') {
            const userSignUpModalElement = getUserSignUpModal()
            const userSignUpModal = new Modal(userSignUpModalElement, {
                keyboard: false,
                backdrop: 'static'
            })
            userSignUpModal.show()
            const signUpElement = document.getElementById('sign-up') as HTMLElement
            signUpElement.addEventListener('click', async () => {
                const userName: string = (document.getElementById('user-name') as HTMLInputElement).value
                const userLocation: string = (document.getElementById('user-location') as HTMLInputElement).value
                const userLanguage: string = (document.getElementById('user-language') as HTMLInputElement).value
                const userUpdateContent = { name: userName, location: userLocation, lang: userLanguage } as type.User
                const retCode: number = await api.saveCurrentUser(userUpdateContent)
                if (retCode === 200) location.reload()
            })
            return
        }

        // MENUspriteアニメーション表示
        const menuSpriteData: type.SpriteData = await api.findSpriteData()
        const menuAnimeCd: string = menuSpriteData[0][0].animeCd
        await createSpriteObject(this, this.spriteLayer)
        const hoverSprite: phaser.GameObjects.Sprite = (this.spriteLayer.get(menuAnimeCd) as type.SpriteObject)
            .spriteObject
        hoverSprite.anims.timeScale = 1 / 6 // frameRate=4。デフォルトが24なので1/6にしている
        hoverSprite.setScale(2)
        hoverSprite.setOrigin(0.5)
        hoverSprite.setVisible(false)

        // 世界に入る
        const enterTheWorld = (): void => {
            this.gameState.scene = 'PLAY'
            this.scene.add('LOAD', LoadScene, false)
            this.scene.start('LOAD').stop('MENU')
        }

        // モーダルウインドウの表示が終わったら再度各ボタンをsetInteractiveする
        modalElement.addEventListener('hidden.bs.modal', () => {
            enterButton.setInteractive()
            loginButton.setInteractive()
            linkButton.setInteractive()
            optionsButton.setInteractive()
        })

        enterButton.setInteractive()

        enterButton.on('pointerover', () => {
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = enterButton.x - enterButton.width
            hoverSprite.y = enterButton.y
        })

        enterButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })

        enterButton.on('pointerup', () => {
            enterTheWorld()
        })

        loginButton.setInteractive()

        loginButton.on('pointerover', () => {
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = loginButton.x - loginButton.width
            hoverSprite.y = loginButton.y
        })

        loginButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })

        loginButton.on('pointerup', () => {
            // モーダルウインドウが表示されているときも各ボタンが反応してしまうのでdisableする。
            enterButton.disableInteractive()
            loginButton.disableInteractive()
            linkButton.disableInteractive()
            optionsButton.disableInteractive()
            const authWithModalElement = getAuthWithModal()
            const authWithModal = new Modal(authWithModalElement, { keyboard: false })
            authWithModal.show()
            const authWithFAcebookElement = document.getElementById('auth-with-facebook') as HTMLElement
            const authWithTwitterElement = document.getElementById('auth-with-twitter') as HTMLElement
            const authWithGoogleElement = document.getElementById('auth-with-google') as HTMLElement
            authWithFAcebookElement.addEventListener('click', async () => {
                if (await api.isAnonymous()) await api.deleteSesUser()
                await api.loginWithProvider('facebook.com')
            })
            authWithTwitterElement.addEventListener('click', async () => {
                if (await api.isAnonymous()) await api.deleteSesUser()
                await api.loginWithProvider('twitter.com')
            })
            authWithGoogleElement.addEventListener('click', async () => {
                if (await api.isAnonymous()) await api.deleteSesUser()
                await api.loginWithProvider('google.com')
            })
            return
        })

        linkButton.setInteractive()

        linkButton.on('pointerover', () => {
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = linkButton.x - linkButton.width
            hoverSprite.y = linkButton.y
        })

        linkButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })

        linkButton.on('pointerup', () => {
            // モーダルウインドウが表示されているときも各ボタンが反応してしまうのでdisableする。
            enterButton.disableInteractive()
            loginButton.disableInteractive()
            linkButton.disableInteractive()
            optionsButton.disableInteractive()
            const authWithModalElement = getAuthWithModal()
            const authWithModal = new Modal(authWithModalElement, { keyboard: false })
            authWithModal.show()
            const authWithFAcebookElement = document.getElementById('auth-with-facebook') as HTMLElement
            const authWithTwitterElement = document.getElementById('auth-with-twitter') as HTMLElement
            const authWithGoogleElement = document.getElementById('auth-with-google') as HTMLElement
            authWithFAcebookElement.addEventListener('click', async () => {
                await api.linkWithProvider('facebook.com')
            })
            authWithTwitterElement.addEventListener('click', async () => {
                await api.linkWithProvider('twitter.com')
            })
            authWithGoogleElement.addEventListener('click', async () => {
                await api.linkWithProvider('google.com')
            })
            return
        })

        optionsButton.setInteractive()

        optionsButton.on('pointerover', () => {
            hoverSprite.setVisible(true)
            hoverSprite.play(menuAnimeCd + '_' + 'walk_back')
            hoverSprite.x = optionsButton.x - optionsButton.width
            hoverSprite.y = optionsButton.y
        })

        optionsButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })

        optionsButton.on('pointerup', () => {
            enterButton.disableInteractive()
            loginButton.disableInteractive()
            linkButton.disableInteractive()
            optionsButton.disableInteractive()
            const optionModalElement = getOptionModal()
            const optionModal = new Modal(optionModalElement, { keyboard: false })
            optionModal.show()
            return
        })
    }
}
