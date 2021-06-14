import express from 'express'
import http from 'http'
import { createConnection } from 'typeorm'
import apiRouter from './router/apiRouter'
import { auth } from './auth/auth'

const server = async (): Promise<void> => {
    const app: express.Express = express()
    // http server
    http.createServer(app).listen(process.env.API_SERVER_PORT)

    // TypeORMの設定
    await createConnection()

    // Body-Parser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // トークンを確認
    app.use(auth)

    // APIRouter
    app.use('/api', apiRouter)

    // 認証Router
    // app.use('/auth', authRouter)
}
server()
