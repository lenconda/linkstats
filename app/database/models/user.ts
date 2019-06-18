import mongoose from 'mongoose'
import { UserMongo } from '../../interfaces'

const schema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  joinTime: { type: Number, default: Date.parse(new Date().toString()) },
  activeCode: { type: String, required: false }
})

export const UserModel =
    mongoose.model<UserMongo>('users', schema, 'users')
