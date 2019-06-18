export const getUserIDByToken = (token: string): string => {
  const tokenArray = token.split('.')
  let userLoginInfo = tokenArray[1]
  if (!userLoginInfo)
    throw new Error(`Token is invalid: ${token}`)
  userLoginInfo = Buffer.from(userLoginInfo, 'base64').toString()
  const userID = JSON.parse(userLoginInfo).id
  return userID
}

export const validateToken = (token: string): boolean => {
  try {
    getUserIDByToken(token)
    return true
  } catch (e) {
    return false
  }
}
