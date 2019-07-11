import mongoose from 'mongoose'
import { RecordMongo } from '../../interfaces'

const ipLocationSchema = new mongoose.Schema({
  country: String,
  countryCode: String,
  latitude: String,
  longitude: String,
  region: String,
  city: String,
})

const versionNameSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  version: { type: String, default: '' },
})

const deviceSchema = new mongoose.Schema({
  type: { type: String, default: '' },
  manufacturer: { type: String, default: '' },
  model: { type: String, default: '' },
})

const proxySchema = new mongoose.Schema({
  remoteAddr: { type: String, default: '' },
  httpVia: { type: String, default: '' },
  httpXForwardedFor: { type: String, default: '' },
})

const schema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  belongs: { type: String, required: true },
  ip: String,
  ipLocation: ipLocationSchema,
  proxy: proxySchema,
  userAgent: String,
  browser: versionNameSchema,
  engine: versionNameSchema,
  os: versionNameSchema,
  device: deviceSchema,
  createTime: Number,
})

const codeSchema = new mongoose.Schema({
  uuid: { type: String, index: true, required: true, unique: true },
  belongs: { type: String, required: true },
  ip: String,
  ipLocation: ipLocationSchema,
  proxy: proxySchema,
  userAgent: String,
  browser: versionNameSchema,
  engine: versionNameSchema,
  os: versionNameSchema,
  device: deviceSchema,
  createTime: Number,
  href: String,
})

export const RecordModel =
    mongoose.model<RecordMongo>('records', schema, 'records')
export const CodeRecordModel = 
  mongoose.model<RecordMongo>('code_records', codeSchema, 'code_records')
