//CONFIG TO THE SERVER

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
//routes
import authRoutes from './routes/auth.routes'


//initializations
const app = express()

//settings
app.set('port', process.env.PORT || 5000)

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

//routes
app.get('/', (req, res) => {
    res.send(`The API is at http://localhost:${app.get('port')}`)
})

app.use(authRoutes)


export default app
