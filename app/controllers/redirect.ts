import {
  JsonController,
  Param,
  QueryParam,
  Get,
  Ctx,
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

  @Get('/code')
  async codeRecord(@QueryParam('id') belongs: string,
               @Ctx() context: Context): Promise<any> {
    return this.service.insertCodeRecord(belongs, context)
  }
}
