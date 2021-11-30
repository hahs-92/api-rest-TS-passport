import { Router } from 'express'
//controllers
import { signIn, signUp } from '../controllers/user.controller'

const router = Router()

//routes
router.post('/signup', signUp)
router.post('/signin', signIn)


export default router
