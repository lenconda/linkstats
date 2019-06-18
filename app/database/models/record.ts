import mongoose from 'mongoose'
import { RecordMongo } from '../../interfaces'

const schema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  belongs: { type: String, required: true },
  ip: String,
  ipLocation: {
    as: String,
    city: String,
    country: String,
    countryCode: String,
    isp: String,
    lat: String,
    lon: String,
    org: String,
    query: String,
    region: String,
    regionName: String,
    status: String,
    timezone: String,
    zip: String
  },
  remoteAddr: String,
  httpVia: String,
  httpXForwardFor: String,
  userAgent: String,
  browser: {
    name: String,
    version: String
  },
  engine: {
    name: String,
    version: String
  },
  os: {
    name: String,
    version: String
  },
  device: {
    type: String,
    manufacturer: String,
    model: String
  },
  createTime: { type: Number, default: Date.parse(new Date().toString()) }
})

export const RecordModel =
    mongoose.model<RecordMongo>('records', schema, 'records')
