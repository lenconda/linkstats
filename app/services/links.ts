import { Service } from 'typedi'
import { LinkModel } from '../database/models/link'
import * as messages from '../../messages'
import {
  InternalServerError
} from 'routing-controllers'
import { LinkMongo } from '../interfaces'
import { generateShortURL } from '../util/short_url'
import { generateUuid } from '../util/uuid'

@Service()
export default class LinksService {
  async getAllLinks(userId: string, size: number, page: number) {
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
          qrCode
        } = value
        return {
          uuid,
          createTime,
          updateTime,
          originalUrl,
          shorternUrl,
          qrCode
        }
      })
      return { items, count }
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }

  async createNewLink(id: string, url: string) {
    try {
      const uuid = await generateUuid()
      const redirectUrl = `https://linkstats.cc/api/redirect/${uuid}`
      const shorternUrl = await generateShortURL(redirectUrl)
      const qrCode = `http://qr.topscan.com/api.php?&w=200&text=${encodeURI(shorternUrl)}`
      const createTime = Date.parse(new Date().toString())
      await LinkModel.insertMany([{
        uuid,
        belongs: id,
        originalUrl: url,
        shorternUrl,
        qrCode,
        createTime
      }])
      return messages.MSG_CREATE_LINK_SUCCESS
    } catch (e) {
      throw new InternalServerError(messages.ERR_CREATE_LINK)
    }
  }

  async deleteLinks(id: string, links: string[]) {
    try {
      await LinkModel.deleteMany({
        uuid: { $in: links }
      })
      return messages.MSG_DELETE_LINK_SUCCESS
    } catch (e) {
      throw new InternalServerError(messages.ERR_DELETE_LINK)
    }
  }
}
