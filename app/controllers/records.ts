import {
  JsonController,
  Get,
  Param,
  Authorized,
  CurrentUser,
  QueryParam,
  BodyParam,
  Delete,
  Ctx
} from 'routing-controllers'
import RecordsService from '../services/records'
import { Inject } from 'typedi'
import { Context } from 'koa'

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
  @Get('/detail/:uuid')
  async getRecordInfo(@CurrentUser() userId: string,
                      @Param('uuid') uuid: string) {
    return await this.service.getRecordInfo(userId, uuid)
  }

  @Authorized()
  @Delete('')
  async deleteRecord(@CurrentUser() userId: string,
                     @BodyParam('records') records: string[]) {
    return await this.service.deleteRecords(userId, records)
  }

  @Authorized()
  @Get('/export')
  async export(@CurrentUser() userId: string,
               @Ctx() context: Context,
               @QueryParam('link') link: string = '') {
    return await this.service.export(userId, context, link)
  }
}
