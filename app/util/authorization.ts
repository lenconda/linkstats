import jwt from 'jsonwebtoken'
import config from '../../config'
import { UnauthorizedError } from 'routing-controllers'

export const generateToken = (payload: any): string => {
  try {
    return jwt.sign(
        {
          ...payload,
          exp: config.isDev ? null : Math.floor(Date.now() / 1000) + (60 * 60),
        },
        'linkstats')
  } catch (e) {
    throw e
  }
}

export const regenerateToken = (token: string): string => {
  try {
    const payload = jwt.verify(token, 'linkstats')
    return generateToken(payload)
  } catch (e) {
    throw e
  }
}

export const getUserIDByToken = (raw: string): any => {
  try {
    const token = raw.substring(7) || ''
    const decoded = jwt.verify(token, 'linkstats')
    return decoded
  } catch (e) {
    throw new UnauthorizedError(e.message)
  }
}

export const validateToken = (raw: string): boolean => {
  try {
    const token = raw.substring(7) || ''
    jwt.verify(token, 'linkstats')
    return true
  } catch (e) {
    return false
  }
}
