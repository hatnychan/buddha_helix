// req.user が使えるようにする。
declare namespace Express {
    export interface Request {
        user?: import('../../../domain/entities/User').User
    }
}
