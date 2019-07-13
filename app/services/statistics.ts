import { Service } from 'typedi'
import { 
  RecordModel,
  CodeRecordModel,
} from '../database/models/record'
import { UserModel } from '../database/models/user'
import { LinkModel } from '../database/models/link'

@Service()
export default class StatisticsService {
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
