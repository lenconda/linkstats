import mongoose from 'mongoose'
import { UserMongo } from '../../interfaces'

const schema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  joinTime: { type: Number, default: Date.parse(new Date().toString()) },
  zipCode: { type: String, default: '', required: false },
  address: { type: String, default: '', required: false },
  city: { type: String, default: '', required: false },
  region: { type: String, default: '', required: false },
  country: { type: String, default: '', required: false },
  activeCode: { type: String, required: false },
})

export const UserModel =
    mongoose.model<UserMongo>('users', schema, 'users')
