import {
  JsonController,
  Authorized,
  Put,
  Param,
  Get,
  CurrentUser,
  QueryParam,
  BodyParam,
  Delete,
  Ctx
} from 'routing-controllers'
import RecordsService from '../services/records'
import { Inject } from 'typedi'

@JsonController('/redirect')
export default class RecordsController {
  @Inject()
  service: RecordsService

  @Get('/:id')
  async record(@Param('id') belongs: string,
               @Ctx() context) {
    return await this.service.record(belongs, context)
  }
}
