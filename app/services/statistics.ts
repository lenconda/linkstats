import { Service } from 'typedi'
import { 
  RecordModel,
  CodeRecordModel,
} from '../database/models/record'
import { UserModel } from '../database/models/user'
import { LinkModel } from '../database/models/link'
import { NotFoundError } from 'routing-controllers'
import * as messages from '../../messages'

@Service()
export default class StatisticsService {
  async getCountries(userId: string, src: string): Promise<any> {
    if (src === 'link') {
      const linkDocs = await LinkModel.find({ belongs: userId })
      const links = linkDocs.map((value, index) => value.uuid)
      const data = await RecordModel.aggregate([
        {
            $match: {
                belongs: {
                    $in: links,
                },
            },
        },
        {
            $group: {
                _id: { name: '$ipLocation.country' },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                country: '$_id.name',
                count: 1,
                _id: 0,
            },
        },
      ])
      return data
    } 
    if (src === 'code') {
      const data = await CodeRecordModel.aggregate([
        {
            $match: {
                belongs: userId,
            },
        },
        {
            $group: {
                _id: { name: '$ipLocation.country' },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                country: '$_id.name',
                count: 1,
                _id: 0,
            },
        },
      ])
      return data
    }
  }

  async basic(userId: string): Promise<any> {
    const userData = await UserModel.findOne({ uuid: userId })
    const email = userData.email
    const name = userData.name
    const joinTime = userData.joinTime
    const linkCount = 
      await LinkModel.find({ belongs: userId }).count()
    const code = 
      await CodeRecordModel.find({ belongs: userId }).count()
      ? true
      : false
    return {
      user: {
        email,
        name,
        joinTime: Date.now() - joinTime,
      },
      linkCount,
      code,
    }
  }

  async records(userId: string): Promise<any> {
    const codeCount = await CodeRecordModel
      .find({ belongs: userId })
      .count()
    const linkDocs = await LinkModel
      .find({ belongs: userId })
    const links = linkDocs.map((value, index) => value.uuid)
    const linkCount = await RecordModel
      .find(
        { 
          belongs: {
            $in: links,
          }, 
        })
      .count()
    return {
      link: linkCount,
      code: codeCount,
    }
  }
}
