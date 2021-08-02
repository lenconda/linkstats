import { Service } from 'typedi'
import { CodeRecordModel } from '../database/models/record'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers'
import { RecordMongo } from '../interfaces'
import * as messages from '../../messages'
import * as json2csv from 'json2csv'

@Service()
export default class CodeService {
  async getAllRecords(uuid: string, size: number, page: number): Promise<any> {
    try {
      const data: RecordMongo[] =
          await CodeRecordModel.find({ belongs: uuid})
          .limit(size)
          .skip((page - 1) * size)
      const items = data.map((value, index) => {
        return {
          uuid: value.uuid,
          href: value.href,
          ip: value.ip,
          country: value.ipLocation.country,
          device: value.device.type,
          createTime: value.createTime,
        }
      })
      const count =
          await CodeRecordModel.count({ belongs: uuid})
      return { items, count }
    } catch (e) {
      throw new InternalServerError(messages.ERR_UNKNOWN)
    }
  }

  async getRecordInfo(userId: string, uuid: string): Promise<any> {
    const record = await CodeRecordModel.findOne({ uuid })
    if (!record)
      throw new NotFoundError(messages.ERR_RECORD_NOTFOUND)
    if (userId !== record.belongs)
      throw new ForbiddenError(messages.ERR_UNAUTHORIZED_RECORD)
    return record
  }

  async deleteRecords(userId: string, records: string[]): Promise<any> {
    for (const item of records) {
      const record = await CodeRecordModel.findOne({ uuid: item })
      if (!record)
        throw new NotFoundError(messages.ERR_RECORD_NOTFOUND)
      if (userId !== record.belongs)
        throw new ForbiddenError(messages.ERR_UNAUTHORIZED_RECORD)
    }
    await CodeRecordModel.deleteMany({
      uuid: {
        $in: records,
      },
    })
    return messages.MSG_DELETE_RECORD_SUCCESS
  }

  async export(userId: string): Promise<any> {
    const data: RecordMongo[] =
        await CodeRecordModel.find({ belongs: userId})
    if (data.length > 0) {
      const items = data.map((value, index) => {
        return {
          uuid: value.uuid,
          href: value.href,
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
        'href',
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
