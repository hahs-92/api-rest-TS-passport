import { Request, Response } from 'express'
//models
import User, {IUser} from '../models/user.model'
//helpers
import { createToken } from '../helpers/createToken'

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please send your mail and password'
        })
    }

    //verificar que no exista ya el email
    const user = await User.findOne({email: req.body.email})

    if(user) {
        return res.status(400).json({msg: 'The user already exist'})
    }

    try {
        const newUser = new User(req.body)
        await newUser.save()

        return res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: 'Something went wrong'})
    }
}

export const signIn = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Please send your mail and password'
        })
    }

    try {
        const user = await User.findOne({email: req.body.email})

        if(!user) {
            return res.status(400).json({msg: 'The user does not exist'})
        }

        const isMatch = await user.comparePassword(req.body.password)

        if(isMatch) {
            return res.status(201).json({
                token: createToken(user)
            })
        }

        return res.status(400).json({
            msg: "email or password are incorrect"
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: 'Something went wrong'})
    }
}