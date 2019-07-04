import {
  JsonController,
  Post,
  BodyParam,
  Get,
  QueryParam,
} from 'routing-controllers'
import AuthenticationService from '../services/authentication'
import { Inject } from 'typedi'

@JsonController('/auth')
export default class HelloController {
  @Inject()
  service: AuthenticationService

  @Post('/login')
  async login(@BodyParam('email') email: string,
              @BodyParam('password') password: string): Promise<any> {
    const result = await this.service.login(email, password)
    return result
  }

  @Post('/register')
  async register(@BodyParam('email') email: string,
                 @BodyParam('password') password: string,
                 @BodyParam('name') name: string): Promise<any> {
    const result = await this.service.register(email, password, name)
    return result
  }

  @Get('/active')
  async active(@QueryParam('user') uuid: string,
               @QueryParam('code') code: string): Promise<any> {
    const result = await this.service.active(uuid, code)
    return result
  }

  @Get('/forgot')
  async forgot(@QueryParam('user') email: string): Promise<any> {
    const result = await this.service.forgot(email)
    return result
  }

  @Post('/reset')
  async reset(@BodyParam('user') uuid: string,
              @BodyParam('code') code: string,
              @BodyParam('password') password: string): Promise<any> {
    const result = await this.service.reset(uuid, code, password)
    return result
  }
}
