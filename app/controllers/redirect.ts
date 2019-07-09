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
    this.service.record(belongs, context)
    return await this.service.get(belongs)
  }
}
