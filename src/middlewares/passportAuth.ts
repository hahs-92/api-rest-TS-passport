import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
//config
import config from '../config/config'
//models
import User from '../models/user.model'

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(options, async(payload, done) => {
    try {
        //payload es el token generado en signin
        const user = await User.findById(payload.id)

        if(user) {
            return done(null, user)
        }

        return done(null, false)
    } catch (error) {
        console.error(error)
    }
})
