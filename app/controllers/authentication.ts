import { JsonController, Post, BodyParam } from 'routing-controllers'
import AuthenticationService from '../services/authentication'
import { Inject } from 'typedi'

@JsonController('/')
export default class HelloController {
  @Inject()
  service: AuthenticationService

  @Post('login')
  async login(
      @BodyParam('email') email: string,
      @BodyParam('password') password: string) {
    const result = await this.service.login(email, password)
    return result
  }

  @Post('register')
  async register(
      @BodyParam('email') email: string,
      @BodyParam('password') password: string,
      @BodyParam('name') name: string) {
    const result = await this.service.register(email, password, name)
    return result
  }
}
