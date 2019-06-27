import jwt from 'jsonwebtoken'

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
