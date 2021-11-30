import mongoose from 'mongoose'
//config
import config from './config/config'


mongoose.connect(config.DB as string)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('Mongo connection stablished')
})

connection.on('error', err => {
    console.error(err)
    process.exit(0)
})
