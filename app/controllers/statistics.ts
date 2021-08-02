import {
  JsonController,
  Get,
  Authorized,
  CurrentUser,
  QueryParam,
} from 'routing-controllers'
import StatisticsService from '../services/statistics'
import { Inject } from 'typedi'

@JsonController('/statistics')
export default class RecordsController {
  @Inject()
  service: StatisticsService

  @Authorized()
  @Get('/countries')
  async getCountries(@CurrentUser() userId: string,
                     @QueryParam('src') src: string): Promise<any> {
    return await this.service.getCountries(userId, src)
  }

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
