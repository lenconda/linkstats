import {
  JsonController,
  Get,
  Param,
  Authorized,
  CurrentUser,
  QueryParam,
  BodyParam,
  Delete,
  Ctx,
} from 'routing-controllers'
import CodeService from '../services/code'
import { Inject } from 'typedi'

@JsonController('/code/record')
export default class RecordsController {
  @Inject()
  service: CodeService

  @Authorized()
  @Get('')
  async getAllRecords(@CurrentUser() uuid: string,
                      @QueryParam('size') size: string = '10',
                      @QueryParam('page') page: string = '1'): Promise<any> {
    return await this.service.getAllRecords(uuid, parseInt(size), parseInt(page))
  }

  @Authorized()
  @Get('/detail/:uuid')
  async getRecordInfo(@CurrentUser() userId: string,
                      @Param('uuid') uuid: string): Promise<any> {
    return await this.service.getRecordInfo(userId, uuid)
  }

  @Authorized()
  @Delete('')
  async deleteRecord(@CurrentUser() userId: string,
                     @BodyParam('records') records: string[]): Promise<any> {
    return await this.service.deleteRecords(userId, records)
  }

  @Authorized()
  @Get('/export')
  async export(@CurrentUser() userId: string): Promise<any> {
    return await this.service.export(userId)
  }
}
