import dovten from 'dotenv'
dovten.config()

export default {
    jwtSecret: process.env.JWT_SECRET || 'mySecret',
    DB: process.env.MONGO_URI
}