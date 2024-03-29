import {
  JsonController,
  Authorized,
  Post,
  Get,
  CurrentUser,
  QueryParam,
  BodyParam,
  Delete, 
  Param,
  Put,
} from 'routing-controllers'
import LinksService from '../services/links'
import { Inject } from 'typedi'

@JsonController('/links')
export default class LinksController {
  @Inject()
  service: LinksService

  @Authorized()
  @Get('')
  async getAllLinks(@CurrentUser() userId: string,
                    @QueryParam('size') size: string = '10',
                    @QueryParam('page') page: string = '1'): Promise<any> {
    return await this.service.getAllLinks(userId, parseInt(size), parseInt(page))
  }

  @Authorized()
  @Get('/:uuid')
  async getLinkInfo(@CurrentUser() userId: string,
                    @Param('uuid') uuid: string): Promise<any> {
    return await this.service.getLinkInfo(userId, uuid)
  }

  @Authorized()
  @Put('/:uuid')
  async updateLink(@CurrentUser() userId: string, 
                   @Param('uuid') uuid: string,
                   @BodyParam('updates') updates: any): Promise<any> {
    return await this.service.updateLink(userId, uuid, updates)
  }

  @Authorized()
  @Post('')
  async createNewLink(@CurrentUser() id: string,
                      @BodyParam('url') url: string,
                      @BodyParam('comment') comment: string = ''): Promise<any> {
    return await this.service.createNewLink(id, url, comment)
  }

  @Authorized()
  @Delete('')
  async deleteLinks(@CurrentUser() id: string,
                    @BodyParam('links') links: string[]): Promise<any> {
    return await this.service.deleteLinks(id, links)
  }
}
