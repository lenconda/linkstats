import {
  JsonController,
  Param,
  Get,
  Ctx
} from 'routing-controllers'
import RedirectService from '../services/redirect'
import { Inject } from 'typedi'

@JsonController('/redirect')
export default class RecordsController {
  @Inject()
  service: RedirectService

  @Get('/:id')
  async record(@Param('id') belongs: string,
               @Ctx() context) {
    return await this.service.record(belongs, context)
  }
}
