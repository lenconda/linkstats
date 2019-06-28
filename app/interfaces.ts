import { Document } from 'mongoose'

export interface User {
  uuid: string
  email: string
  password: string
  name: string
  joinTime: number
  activeCode: string
}

export interface UserMongo extends User, Document {}

export interface Link {
  uuid: string
  belongs: string
  originalUrl: string
  shorternUrl: string
  qrCode: string
  createTime: number
  updateTime: number
}

export interface LinkMongo extends Link, Document {}

interface UserAgentInfo {
  name: string
  version: string
}

interface DeviceInfo {
  type: string
  manufacturer: string
  model: string
}

export interface IPLocation {
  country: string
  countryCode: string
  region: string
  city: string
  latitude: string
  longitude: string
}

export interface Record {
  uuid: string
  belongs: string
  ip: string
  ipLocation: IPLocation
  remoteAddr: string
  httpVia: string
  httpXForwardFor: string
  userAgent: string
  browser: UserAgentInfo
  engine: UserAgentInfo
  os: UserAgentInfo
  device: DeviceInfo
  createTime: number
}

export interface RecordMongo extends Record, Document {}
