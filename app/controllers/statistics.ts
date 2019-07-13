import {
  JsonController,
  Get,
  Authorized,
  CurrentUser,
} from 'routing-controllers'
import StatisticsService from '../services/statistics'
import { Inject } from 'typedi'

@JsonController('/statistics')
export default class RecordsController {
  @Inject()
  service: StatisticsService

  @Authorized()
  @Get('/basic')
  async basic(@CurrentUser() userId: string): Promise<any> {
    return await this.service.basic(userId)
  }

  @Authorized()
  @Get('/records')
  async links(@CurrentUser() userId: string): Promise<any> {
    return await this.service.records(userId)
  }
  
}
