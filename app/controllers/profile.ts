import {
  JsonController,
  Authorized,
  Post,
  Get,
  CurrentUser,
  Body
} from 'routing-controllers'
import ProfileService from '../services/profile'
import { Inject } from 'typedi'

@JsonController('/profile')
export default class ProfileController {
  @Inject()
  service: ProfileService

  @Authorized()
  @Get('/info')
  async info(@CurrentUser() id) {
    return await this.service.getUserInfo(id)
  }

  @Authorized()
  @Post('/update')
  async updateProfile(@CurrentUser() id, @Body() profile) {
    return await this.service.updateProfile(id, profile)
  }

  @Authorized()
  @Post('/change_password')
  async changePassword(@CurrentUser() id, @Body() update) {
    return await this.service.changePassword(id, update)
  }
}
