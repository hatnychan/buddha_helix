// game-logにログを出力する。
export const outputGameLog = (newGameLog: string): void => {
    const gameLogElement: HTMLElement = document.getElementById('game-log') as HTMLElement
    const gameLog: string = gameLogElement.innerHTML
    gameLogElement.innerHTML = gameLog.length > 0 ? gameLog + '<br>' + newGameLog : newGameLog
}

// テキスト中の${0}, ${1}となっているところを引数の値で置換する。
export const replaceText = (text: string, ...replaceArgs: string[]): string => {
    replaceArgs.forEach((arg: string, index: number) => {
        const target = new RegExp('\\$\\{' + index + '\\}', 'g') //gオプション付けると最初の一個だけでなく全部置換する。
        text = text.replace(target, arg)
    })
    return text
}

// モーダルの要素を取得。
const getModalElement = (bodyHtml: string, headerHtml?: string, footerHtml?: string): HTMLElement => {
    const modalElement: HTMLElement = document.getElementById('modal') as HTMLElement
    const modalContent: Element = modalElement.getElementsByClassName('modal-content')[0]
    while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild)
    }

    // モーダルheader追加
    if (headerHtml) {
        const modalHeader: Element = document.createElement('div')
        modalHeader.className = 'modal-header'
        modalContent.appendChild(modalHeader)
        modalHeader.insertAdjacentHTML('afterbegin', headerHtml)
    }

    // モーダルbody追加
    const modalBody: Element = document.createElement('div')
    modalBody.className = 'modal-body'
    modalContent.appendChild(modalBody)
    modalBody.insertAdjacentHTML('afterbegin', bodyHtml)

    // モーダルfooter追加
    if (footerHtml) {
        const modalFooter: Element = document.createElement('div')
        modalFooter.className = 'modal-footer'
        modalContent.appendChild(modalFooter)
        modalFooter.insertAdjacentHTML('afterbegin', footerHtml)
    }

    return modalElement
}

// ユーザー登録要素を挿入してモーダル要素を取得する。
// TODO: バリデーションチェック入れる
export const getUserSignUpModal = (): HTMLElement => {
    const modalHeader = '<h3 class="modal-title">WELCOME</h3>'
    const modalBody =
        '<div class="mb-3">' +
        '<p1> こんにちは名無しさん。まずは基本的なことを教えてね。 </p1>' +
        '</div>' +
        '<form>' +
        '<div class="mb-2">' +
        '<label for="user-name" class="col-form-label">Name:</label>' +
        '<input type="text" class="form-control" id="user-name">' +
        '</div>' +
        '<div class="mb-2">' +
        '<label for="user-location" class="col-form-label">Location:</label>' +
        '<select class="form-select" id="user-location">' +
        '<option value="" disabled selected>select one</option>' +
        '<option value="TOKYO">東京</option>' +
        '</select>' +
        '</div>' +
        '<div class="mb-3">' +
        '<label for="user-language" class="col-form-label">Language:</label>' +
        '<select class="form-select" id="user-language">' +
        '<option value="" disabled selected>select one</option>' +
        '<option value="ja">日本語</option>' +
        '</select>' +
        '</div>' +
        '</form>'

    const modalFooter = '<button type="button" class="btn btn-primary" data-dismiss="modal" id="sign-up">OK</button>'
    return getModalElement(modalBody, modalHeader, modalFooter)
}

// ソーシャルログインボタンを挿入してモーダル要素を取得する。
export const getAuthWithModal = (): HTMLElement => {
    const modalBody =
        '<a href="#" id="auth-with-facebook" class="fb social-login-btn">' +
        '<i class="fab fa-facebook fa-fw"></i> Auth with Facebook' +
        '</a>' +
        '<a href="#" id="auth-with-twitter" class="twitter social-login-btn">' +
        '<i class="fab fa-twitter fa-fw"></i> Auth with Twitter' +
        '</a>' +
        '<a href="#" id="auth-with-google" class="google social-login-btn">' +
        '<i class="fab fa-google fa-fw"></i> Auth with Google' +
        '</a>'
    return getModalElement(modalBody)
}

// オプション要素を挿入してモーダル要素を取得する。
export const getOptionModal = (): HTMLElement => {
    const modalBody = '<h1> 工事中！ </h1>'
    return getModalElement(modalBody)
}
