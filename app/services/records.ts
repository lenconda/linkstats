import { Service } from 'typedi'
import { LinkModel } from '../database/models/link'
import { RecordModel } from '../database/models/record'
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError
} from 'routing-controllers'
import { LinkMongo, RecordMongo } from '../interfaces'
import * as messages from '../../messages'

@Service()
export default class RecordsService {
  async getAllRecords(uuid: string, size: number, page: number, link: string) {
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
          device: value.device.type
        }
      })
      const count =
          await RecordModel.count({ belongs: { $in: link ? link : links }})
      return { items, count }
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }

  async getRecordInfo(userId: string, uuid: string) {
    try {
      const record = await RecordModel.findOne({ uuid })
      if (!record)
        throw new NotFoundError(messages.ERR_RECORD_NOTFOUND)
      const link = await LinkModel.findOne({ uuid: record.belongs })
      if (link.belongs !== userId)
        throw new ForbiddenError(messages.ERR_UNAUTHORIZED_RECORD)
      return record
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }

  async deleteRecord(userId: string, uuid: string) {
    try {
      const record = await RecordModel.findOne({ uuid })
      const link = await LinkModel.findOne({ uuid: record.belongs })
      if (link.belongs !== userId)
        throw new ForbiddenError(messages.ERR_UNAUTHORIZED_RECORD)
      await RecordModel.deleteOne({ uuid })
      return messages.MSG_DELETE_RECORD_SUCCESS
    } catch (e) {
      throw new InternalServerError(e.message)
    }
  }
}
