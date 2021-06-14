import phaser from 'phaser'

export type SerializedStrParam = {
    [cd: string]: {
        [key: string]: string
    }
}

export type SerializedNumParam = {
    [cd: string]: {
        [key: string]: number
    }
}

export type SerializedGameLog = {
    [cd: string]: {
        [key: string]: string
    }
}

export type User = {
    name: string
    location: string
    lang: string
}

export type MapData = [MapImage, MapPos]

export type MapImage = {
    [x: string]: string
}

export type MapPos = {
    mapId: string
    tilePos: Map<string, number[][]>
    eventPos: Map<string, number[][]>
}

// TODO: DynamicTilemapLayerはなくなった？
export type MapLayer = Map<string, phaser.Tilemaps.TilemapLayer>

export type SpriteData = [SpriteTextureConfig[], SpriteActConfig[]]

export type SpriteTextureConfig = {
    animeCd: string
    animeKey: string[]
    texture: string
    width: number
    height: number
}

export type SpriteActConfig = {
    initAnimeCd: string
    initFrame: number
    initX: number
    initY: number
    act: string[]
}

export type SpriteLayer = Map<string, SpriteObject>

export type SpriteObject = {
    spriteObject: phaser.GameObjects.Sprite
    x: number
    y: number
    act: string[]
    isAction: boolean
}
