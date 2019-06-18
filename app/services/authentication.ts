import { Service } from 'typedi'
import { UserModel } from '../database/models/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import * as messages from '../../messages'
import { ForbiddenError, InternalServerError } from 'routing-controllers'
import { generateUuid } from '../util/uuid'
import uuidv4 from 'uuid/v4'
import { sendMail } from '../util/mail'

@Service()
export default class AuthenticationService {
  async login(email: string, password: string) {
    const result = await UserModel.findOne({ email, password: md5(password) })
    if (result) {
      const payload = {
        id: result.uuid,
        email: result.email,
        name: result.name
      }
      return {
        token: jwt.sign(payload, 'linkstats', { expiresIn: '1day' })
      }
    } else
      throw new ForbiddenError(messages.ERR_LOGIN_DISMATCH)
  }

  async register(email: string, password: string, name: string) {
    const result = await UserModel.findOne({ email })
    if (result)
      throw new ForbiddenError(messages.ERR_DUPLICATE_EMAIL)
    else {
      const uuid = generateUuid()
      const joinTime = Date.parse(new Date().toString())
      const activeCode = new Buffer(uuidv4()).toString('base64')
      try {
        await UserModel.insertMany([{
          uuid, email, password, name, joinTime, activeCode
        }])
        sendMail(activeCode, name, email, uuid)
        return messages.MSG_REGISTER_SUCCESS
      } catch (error) {
        throw new InternalServerError(messages.ERR_REGISTER_FAILED)
      }
    }
  }
}
