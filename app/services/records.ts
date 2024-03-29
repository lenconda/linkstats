import { Service } from 'typedi'
import { LinkModel } from '../database/models/link'
import { RecordModel } from '../database/models/record'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers'
import { LinkMongo, RecordMongo } from '../interfaces'
import * as messages from '../../messages'
import * as json2csv from 'json2csv'
import { Context } from 'koa'

@Service()
export default class RecordsService {
  async getAllRecords(uuid: string, size: number, page: number, link: string): Promise<any> {
    try {
      const linksData: LinkMongo[] =
          await LinkModel.find({ belongs: uuid })
      const links = linksData.map((value, index) => value.uuid)
      const data: RecordMongo[] =
          await RecordModel.find({ belongs: { $in: link ? link : links }})
          .limit(size)
          .skip((page - 1) * size)
      const items = data.map((value, index) => {
        return {
          uuid: value.uuid,
          belongs: value.belongs,
          ip: value.ip,
          country: value.ipLocation.country,
          device: value.device.type,
          createTime: value.createTime,
        }
      })
      const count =
          await RecordModel.count({ belongs: { $in: link ? link : links }})
      return { items, count }
    } catch (e) {
      throw new InternalServerError(messages.ERR_UNKNOWN)
    }
  }

  async getRecordInfo(userId: string, uuid: string): Promise<any> {
    const record = await RecordModel.findOne({ uuid })
    if (!record)
      throw new NotFoundError(messages.ERR_RECORD_NOTFOUND)
    const link = await LinkModel.findOne({ uuid: record.belongs })
    if (link.belongs !== userId)
      throw new ForbiddenError(messages.ERR_UNAUTHORIZED_RECORD)
    return record
  }

  async deleteRecords(userId: string, records: string[]): Promise<any> {
    for (const item of records) {
      const record = await RecordModel.findOne({ uuid: item })
      if (!record) {
        throw new NotFoundError(messages.ERR_RECORD_NOTFOUND)
        return
      }
      const link = await LinkModel.findOne({ uuid: record.belongs })
      if (link.belongs !== userId) {
        throw new ForbiddenError(messages.ERR_UNAUTHORIZED_RECORD)
        return
      }
    }
    await RecordModel.deleteMany({
      uuid: {
        $in: records,
      },
    })
    return messages.MSG_DELETE_RECORD_SUCCESS
  }

  async export(userId: string, context: Context, link: string): Promise<any> {
    const linksData: LinkMongo[] =
        await LinkModel.find({ belongs: userId })
    const links = linksData.map((value, index) => value.uuid)
    const data: RecordMongo[] =
        await RecordModel.find({ belongs: { $in: link ? link : links }})
    if (data.length > 0) {
      const items = data.map((value, index) => {
        return {
          uuid: value.uuid,
          belongs: value.belongs,
          ip: value.ip,
          userAgent: value.userAgent,
          country: value.ipLocation.country,
          longitude: value.ipLocation.longitude,
          latitude: value.ipLocation.latitude,
          device: value.device.type,
          browser: value.browser.name,
          browserVersion: value.browser.version,
          os: value.os.name,
          osVersion: value.os.version,
          createTime: new Date(value.createTime).toUTCString(),
        }
      })
      const fields = [
        'uuid',
        'belongs',
        'ip',
        'userAgent',
        'country',
        'longitude',
        'latitude',
        'device',
        'browser',
        'browserVersion',
        'os',
        'osVersion',
        'createTime',
      ]
      const csv = json2csv.parse(items, fields)
      return { text: csv }
    } else
      throw new NotFoundError(messages.ERR_EMPTY_RECORD)
  }
}
