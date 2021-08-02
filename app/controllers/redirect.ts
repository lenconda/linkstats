import {
  JsonController,
  QueryParam,
  Get,
  Ctx,
  Post,
  BodyParam,
} from 'routing-controllers'
import RedirectService from '../services/redirect'
import { Inject } from 'typedi'
import { Context } from 'koa'

@JsonController('/redirect')
export default class RecordsController {
  @Inject()
  service: RedirectService

  @Get('')
  async record(@QueryParam('to') belongs: string,
               @Ctx() context: Context): Promise<any> {
    this.service.insertLinkRecord(belongs, context)
    return await this.service.get(belongs)
  }

  @Post('/code')
  async codeRecord(@QueryParam('id') belongs: string,
                   @BodyParam('href') href: string,
                   @Ctx() context: Context): Promise<any> {
    try {
      return await this.service.insertCodeRecord(belongs, href, context)
    } catch (e) {
      console.log(e)
    }
  }
}
