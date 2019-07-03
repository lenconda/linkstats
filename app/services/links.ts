import { Service } from 'typedi'
import { LinkModel } from '../database/models/link'
import * as messages from '../../messages'
import {
  InternalServerError, 
  NotFoundError,
} from 'routing-controllers'
import { LinkMongo } from '../interfaces'
import { generateShortURL } from '../util/short_url'
import { generateUuid } from '../util/uuid'
import config from '../../config'

@Service()
export default class LinksService {
  async getAllLinks(userId: string, size: number, page: number): Promise<any> {
    try {
      const data: LinkMongo[] = await LinkModel
          .find({ belongs: userId })
          .limit(size)
          .skip((page - 1) * size)
      const count = await LinkModel.count({ belongs: userId })
      const items = data.map((value, index) => {
        const {
          uuid,
          createTime,
          updateTime,
          originalUrl,
          shorternUrl,
          qrCode,
        } = value
        return {
          uuid,
          createTime,
          updateTime,
          originalUrl,
          shorternUrl,
          qrCode,
        }
      })
      return { items, count }
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }

  async getLinkInfo(userId: string, uuid: string): Promise<any> {
    const data = await LinkModel
        .findOne({ uuid, belongs: userId })
    if (!data) {
      throw new NotFoundError(messages.ERR_LINK_NOTFOUND)
      return
    }
    const {
      createTime,
      originalUrl,
      shorternUrl,
      qrCode,
    } = data
    return {
      createTime,
      originalUrl,
      shorternUrl,
      qrCode,
    }
  }

  async createNewLink(id: string, url: string): Promise<any> {
    try {
      const uuid = await generateUuid()
      const redirectUrl = `${config.recordPrefix}?to=${uuid}`
      const shorternUrl = await generateShortURL(redirectUrl)
      const qrCode = `http://qr.topscan.com/api.php?&w=200&text=${encodeURI(shorternUrl)}`
      const createTime = Date.parse(new Date().toString())
      await LinkModel.insertMany([{
        uuid,
        belongs: id,
        originalUrl: url,
        shorternUrl,
        qrCode,
        createTime,
      }])
      return messages.MSG_CREATE_LINK_SUCCESS
    } catch (e) {
      throw new InternalServerError(messages.ERR_CREATE_LINK)
    }
  }

  async deleteLinks(id: string, links: string[]): Promise<any> {
    await LinkModel.deleteMany({
      uuid: { $in: links },
      belongs: id,
    })
    return messages.MSG_DELETE_LINK_SUCCESS
  }
}
