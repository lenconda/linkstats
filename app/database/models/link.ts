import mongoose from 'mongoose'
import { LinkMongo } from '../../interfaces'

const schema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  belongs: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shorternUrl: { type: String, required: true },
  qrCode: { type: String, required: true },
  createTime: { type: Number },
  updateTime: { type: Number },
})

export const LinkModel =
    mongoose.model<LinkMongo>('links', schema, 'links')
