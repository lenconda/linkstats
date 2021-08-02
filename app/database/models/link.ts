import mongoose from 'mongoose'
import { LinkMongo } from '../../interfaces'

const schema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  belongs: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shorternUrl: { type: String, required: true },
  comment: { type: String, required: false, default: '' },
  qrCode: { type: String, required: true },
  createTime: { type: Number },
  updateTime: { type: Number, default: 0 },
})

export const LinkModel =
    mongoose.model<LinkMongo>('links', schema, 'links')
