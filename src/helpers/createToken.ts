import jwt from 'jsonwebtoken'
//config
import config from '../config/config'
//model type
import { IUser } from '../models/user.model'

export const createToken = (user: IUser) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, config.jwtSecret, {
        expiresIn: '1d'
    })

    return token
}