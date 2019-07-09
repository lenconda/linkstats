import {
  JsonController,
  Param,
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

  @Get('/:id')
  async record(@Param('id') belongs: string,
               @Ctx() context: Context): Promise<any> {
    this.service.record(belongs, context)
    return await this.service.get(belongs)
  }
}
