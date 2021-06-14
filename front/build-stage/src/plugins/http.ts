/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { auth } from './auth'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000

// リクエスト送信前に認証トークンをリクエストヘッダーにセットする。
axios.interceptors.request.use(async (req) => {
    const token = await auth.getToken()
    req.headers.authorization = token
    return req
})

// リクエスト送信後に認証トークンをリクエストヘッダーにセットする。
// axios.interceptors.response.use((res) => {
//     const token = res.headers.authorization
//     state.setItem('token', token)
//     return res
// })

const httpErrorHandler = (err: AxiosError<any>) => {
    const httpStatus = err.response ? err.response.status : null
    if (httpStatus === 403) {
        const errMsg403 = '認証に失敗したかログイン期限が切れました。再度ログインしてください。'
        throw new Error(errMsg403)
    }
    const errMsg = '何かエラーが発生したみたいです。'
    throw new Error(errMsg)
}

export const get = async (url: string, params = {}): Promise<any> => {
    const ret = await axios.get(url, params).catch((err) => httpErrorHandler(err))
    // const token = ret.headers.authorization
    // state.setItem('token', token)
    return ret
}

export const post = async (url: string, params = {}): Promise<any> => {
    const ret = await axios.post(url, params).catch((err) => httpErrorHandler(err))
    // const token = ret.headers.authorization
    // state.setItem('token', token)
    return ret
}

export const put = async (url: string, params = {}): Promise<any> => {
    const ret = await axios.put(url, params).catch((err) => httpErrorHandler(err))
    // const token = ret.headers.authorization
    // state.setItem('token', token)
    return ret
}

export const del = async (url: string, params = {}): Promise<any> => {
    const ret = await axios.delete(url, params).catch((err) => httpErrorHandler(err))
    // const token = ret.headers.authorization
    // state.setItem('token', token)
    return ret
}
