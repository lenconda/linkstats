import {
  JsonController,
  Param,
  Get,
  Authorized,
  CurrentUser,
  QueryParam,
  Delete
} from 'routing-controllers'
import RecordsService from '../services/records'
import { Inject } from 'typedi'

@JsonController('/record')
export default class RecordsController {
  @Inject()
  service: RecordsService

  @Authorized()
  @Get('')
  async getAllRecords(@CurrentUser() uuid: string,
                      @QueryParam('size') size: string = '10',
                      @QueryParam('page') page: string = '1',
                      @QueryParam('link') link: string = '') {
    return await this.service.getAllRecords(uuid, parseInt(size), parseInt(page), link)
  }

  @Authorized()
  @Get('/:uuid')
  async getRecordInfo(@CurrentUser() userId: string,
                      @Param('uuid') uuid: string) {
    return await this.service.getRecordInfo(userId, uuid)
  }

  @Authorized()
  @Delete('/:uuid')
  async deleteRecord(@CurrentUser() userId: string,
                     @Param('uuid') uuid: string) {
    return await this.service.deleteRecord(userId, uuid)
  }
}
