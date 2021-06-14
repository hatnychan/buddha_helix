export class GameState {
    private static _instance: GameState = new GameState()
    isWalking = false
    isTalking = false
    isCreateComplete = false
    weather = 'sunny'
    timeZone = 'morning'
    scene = 'MENU'

    private constructor() {
        // singleton
    }

    static get instance(): GameState {
        return this._instance
    }
}
