import { Service } from 'typedi'
import { UserModel } from '../database/models/user'
import md5 from 'md5'
import * as messages from '../../messages'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers'
import { generateUuid } from '../util/uuid'
import uuidv4 from 'uuid/v4'
import { sendMail } from '../util/mail'
import { generateToken } from '../util/authorization'

@Service()
export default class AuthenticationService {
  async login(email: string, password: string): Promise<any> {
    const result = await UserModel.findOne({ email, password: md5(password) })
    if (result) {
      if (!!result.activeCode)
        throw new ForbiddenError(messages.ERR_LOGIN_BANNED)
      const payload = {
        id: result.uuid,
        email: result.email,
        name: result.name,
      }
      return {
        token: generateToken(payload),
      }
    } else
      throw new ForbiddenError(messages.ERR_LOGIN_DISMATCH)
  }

  async register(email: string, password: string, name: string): Promise<any> {
    const result = await UserModel.findOne({ email })
    if (result)
      throw new ForbiddenError(messages.ERR_DUPLICATE_EMAIL)
    else {
      const uuid = generateUuid()
      const joinTime = Date.parse(new Date().toString())
      const activeCode = new Buffer(uuidv4()).toString('base64')
      try {
        await UserModel.insertMany([{
          uuid, email, password: md5(password), name, joinTime, activeCode,
        }])
        sendMail(0, activeCode, name, email, uuid)
        return messages.MSG_REGISTER_SUCCESS
      } catch (error) {
        throw new InternalServerError(messages.ERR_REGISTER_FAILED)
      }
    }
  }

  async active(uuid: string, code: string): Promise<any> {
    const result = await UserModel.findOne({ uuid, activeCode: code })
    if (result) {
      await UserModel.updateOne({ uuid, activeCode: code }, { activeCode: '' })
      return messages.MSG_ACTIVE_SUCCESS
    } else
      throw new ForbiddenError(messages.ERR_ACTIVE_FAILED)
  }

  async forgot(email: string): Promise<any> {
    const result = await UserModel.findOne({ email, activeCode: '' })
    if (!result)
      throw new NotFoundError(messages.ERR_USER_NOTFOUND)
    else {
      try {
        const activeCode = new Buffer(uuidv4()).toString('base64')
        await UserModel.updateOne({ email }, { activeCode })
        sendMail(1, activeCode, result.name, email, result.uuid, Date.parse(new Date().toString()))
        return messages.MSG_RESET_MAIL_SENT
      } catch (error) {
        throw new InternalServerError(messages.ERR_RESET_FAILED)
      }
    }
  }

  async reset(uuid: string, code: string, password: string): Promise<any> {
    const result = await UserModel.findOne({ uuid, activeCode: code })
    if (!result)
      throw new ForbiddenError(messages.ERR_RESET_LINK_DISMATCH)
    else {
      await UserModel.updateOne({ uuid }, { password: md5(password), activeCode: '' })
      return messages.MSG_RESET_SUCCESS
    }
  }
}
