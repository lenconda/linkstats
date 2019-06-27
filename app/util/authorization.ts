import jwt from 'jsonwebtoken'
import config from '../../config'

export const generateToken = (payload: any): string => {
  return jwt.sign(
      payload,
      'linkstats',
      config.isDev ? null : { expiresIn: '600000' })
}

export const regenerateToken = (token: string): string => {
  const payload = jwt.verify(token, 'linkstats')
  return generateToken(payload)
}

export const getUserIDByToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, 'linkstats')
    return decoded
  } catch (e) {
    throw e
  }
}

export const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, 'linkstats')
    return true
  } catch (e) {
    return false
  }
}
