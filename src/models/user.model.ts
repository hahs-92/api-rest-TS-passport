import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string,
    password: string
}

const userSchema = new Schema<IUser> ({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

//middleware to cifrar password
userSchema.pre<IUser>('save', async function(next) {
    const user = this

    if(!user.isModified('password')) return next()

    const salt =await bcrypt.genSalt(10)
    const hahs = await bcrypt.hash(user.password, salt)

    user.password = hahs
    next()
})

//compare password
userSchema.methods.comparedPassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)
