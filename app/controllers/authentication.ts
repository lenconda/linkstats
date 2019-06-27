import {
  JsonController,
  Post,
  BodyParam,
  Get,
  QueryParam
} from 'routing-controllers'
import AuthenticationService from '../services/authentication'
import { Inject } from 'typedi'

@JsonController('/auth')
export default class HelloController {
  @Inject()
  service: AuthenticationService

  @Post('/login')
  async login(
      @BodyParam('email') email: string,
      @BodyParam('password') password: string) {
    const result = await this.service.login(email, password)
    return result
  }

  @Post('/register')
  async register(
      @BodyParam('email') email: string,
      @BodyParam('password') password: string,
      @BodyParam('name') name: string) {
    const result = await this.service.register(email, password, name)
    return result
  }

  @Get('/active')
  async active(
      @QueryParam('user') uuid: string,
      @QueryParam('code') code: string) {
    const result = await this.service.active(uuid, code)
    return result
  }

  @Get('/forgot')
  async forgot(@QueryParam('user') email: string) {
    const result = await this.service.forgot(email)
    return result
  }

  @Post('/reset')
  async reset(
      @BodyParam('uuid') uuid: string,
      @BodyParam('code') code: string,
      @BodyParam('password') password: string) {
    const result = await this.service.reset(uuid, code, password)
    return result
  }
}
