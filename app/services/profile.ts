import { Service } from 'typedi'
import { UserModel } from '../database/models/user'
import md5 from 'md5'
import * as messages from '../../messages'
import {
  ForbiddenError,
  InternalServerError,
} from 'routing-controllers'

export interface UserInfo {
  uuid: string
  name: string
  email: string
  joinTime: number
}

@Service()
export default class ProfileService {
  async getUserInfo(id: string): Promise<UserInfo> {
    const { joinTime, name, uuid, email } = await UserModel.findOne({ uuid: id })
    return {
      joinTime, name, uuid, email,
    }
  }

  async updateProfile(id: string, profile: any): Promise<any> {
    try {
      await UserModel.updateOne({ uuid: id }, profile)
      return messages.MSG_UPDATE_PROFILE_SUCCESS
    } catch (e) {
      throw new InternalServerError(messages.ERR_UPDATE_PROFILE)
    }
  }

  async changePassword(id: string, update: any): Promise<any> {
    const result = await UserModel.findOne({
      uuid: id, password: md5(update.old),
    })
    if (!result)
      throw new ForbiddenError(messages.ERR_CHANGE_PASSWD_DISMATCH_OLD)
    else {
      try {
        await UserModel.updateOne(
            { uuid: id },
            { password: md5(update.new) })
        return messages.MSG_CHANGE_PASSWD_SUCCESS
      } catch (e) {
        throw new InternalServerError(messages.ERR_CHANGE_PASSWD)
      }
    }
  }
}
