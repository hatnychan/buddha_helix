import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {

}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let init = true
firebase.auth().onAuthStateChanged((user) => {
    if (!user && init) firebase.auth().signInAnonymously()
    init = false
})

firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
        if (result.credential) {
            console.log('認証に成功しました。')
        }
    })
    .catch((error) => {
        const errorMsg = '認証に失敗したかもです。'
        throw new Error(errorMsg)
    })

export const auth = {
    async linkWithProvider(providerName: string): Promise<void> {
        let provider: firebase.auth.AuthProvider | undefined
        if (providerName === 'facebook.com') {
            provider = new firebase.auth.FacebookAuthProvider()
        } else if (providerName === 'twitter.com') {
            provider = new firebase.auth.TwitterAuthProvider()
        } else if (providerName === 'google.com') {
            provider = new firebase.auth.GoogleAuthProvider()
        }
        if (!provider) {
            const errorMsg = providerName + 'なんて認証方法はありません。'
            throw new Error(errorMsg)
        }
        const user = firebase.auth().currentUser
        if (!user) {
            const errorMsg = '認証に失敗したかもです。'
            throw new Error(errorMsg)
        }
        await user.linkWithRedirect(provider).catch((error) => {
            const errorMsg = error.message
            throw new Error(errorMsg)
        })
    },

    async loginWithProvider(providerName: string): Promise<void> {
        let provider: firebase.auth.AuthProvider | undefined
        if (providerName === 'facebook.com') {
            provider = new firebase.auth.FacebookAuthProvider()
        } else if (providerName === 'twitter.com') {
            provider = new firebase.auth.TwitterAuthProvider()
        } else if (providerName === 'google.com') {
            provider = new firebase.auth.GoogleAuthProvider()
        }
        if (!provider) {
            const errorMsg = providerName + 'なんて認証方法はありません。'
            throw new Error(errorMsg)
        }
        await firebase
            .auth()
            .signInWithRedirect(provider)
            .catch((error) => {
                const errorMsg = error.message
                throw new Error(errorMsg)
            })
    },

    async logout(): Promise<void> {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('ログアウトしました。')
                location.reload()
            })
            .catch((error) => {
                console.log(error.message)
            })
    },

    async deleteSesUser(): Promise<void> {
        const user = firebase.auth().currentUser
        if (user) {
            await user.delete().catch((error) => {
                console.log(error.message)
            })
        }
    },

    async getToken(): Promise<string | undefined> {
        return new Promise((resolve) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // サインインしている場合
                    resolve(user.getIdToken())
                } else {
                    // サインインしていない場合
                    const errMsg403 = '認証に失敗したかログイン期限が切れました。再度ログインしてください。'
                    throw new Error(errMsg403)
                }
            })
        })
    },

    async isAnonymous(): Promise<boolean> {
        return new Promise((resolve) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // サインインしている場合
                    resolve(user.isAnonymous)
                } else {
                    // サインインしていない場合
                    const errMsg403 = '認証に失敗したかログイン期限が切れました。再度ログインしてください。'
                    throw new Error(errMsg403)
                }
            })
        })
    }
}
