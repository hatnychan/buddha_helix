import StrParam from '../../domain/entities/StrParam'

export class SerializedStrParam {
    [cd: string]: {
        [key: string]: string
    }

    constructor(strParamArray: StrParam[]) {
        strParamArray.forEach((strParam) => {
            if (!this[strParam.code]) this[strParam.code] = {}
            this[strParam.code][strParam.key] = strParam.value
        })
    }
}
export default SerializedStrParam

// StrParam[]を下記のような構造に変える。
// {
//     ASSETS_IMAGE(メンバ変数) = {
//         FRAME: 'frame.png',
//         LOGO: 'logo.png',
//         OPTIONS: 'options_button.png',
//         PLAY: 'play_button.png',
//         TITLE: 'title_bg.jpg'
//     },
//     ASSETS_AUDIO(メンバ変数) = {
//         OPENING: 'PerituneMaterial_Splash.mp3'
//     }
// }
