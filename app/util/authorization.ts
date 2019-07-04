import jwt from 'jsonwebtoken'
import config from '../../config'
import { UnauthorizedError } from 'routing-controllers'

export const generateToken = (payload: any, regen: boolean = false): string => {
  try {
    return jwt.sign(
        payload,
        'linkstats',
        (config.isDev || regen) ? null : { expiresIn: '600000' })
  } catch (e) {
    throw e
  }
}

export const regenerateToken = (token: string): string => {
  try {
    const payload = jwt.verify(token, 'linkstats')
    return generateToken(payload, true)
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
