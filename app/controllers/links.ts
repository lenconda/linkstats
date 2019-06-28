import {
  JsonController,
  Authorized,
  Post,
  Get,
  CurrentUser,
  QueryParam,
  BodyParam,
  Delete
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
                    @QueryParam('page') page: string = '1') {
    return await this.service.getAllLinks(userId, parseInt(size), parseInt(page))
  }

  @Authorized()
  @Post('')
  async createNewLink(@CurrentUser() id: string,
                      @BodyParam('url') url: string) {
    return await this.service.createNewLink(id, url)
  }

  @Authorized()
  @Delete('')
  async deleteLinks(@CurrentUser() id: string,
                    @BodyParam('links') links: string[]) {
    return await this.service.deleteLinks(id, links)
  }
}
