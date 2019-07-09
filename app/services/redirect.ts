import { Service } from 'typedi'
import { LinkModel } from '../database/models/link'
import { RecordModel } from '../database/models/record'
import { generateUuid } from '../util/uuid'
import { Context } from 'koa'
import uaDevice from 'ua-device'
import { getGeoInfo } from '../util/ip_helper'
import { NotFoundError } from 'routing-controllers'
import { ERR_LINK_NOTFOUND } from '../../messages'

@Service()
export default class RedirectService {
  async record(belongs: string, context: Context): Promise<any> {
    const uuid = generateUuid()
    const { originalUrl } = await LinkModel.findOne({ uuid: belongs })
    const ipRaw =
      context.request.headers['x-real-ip']
      || context.request.headers['remote-addr']
      || context.request.headers['x-forwarded-for']
    const ip = ipRaw.substr(0, 7) === '::ffff:'
      ? ipRaw.substr(7)
      : ipRaw

    const proxy = {
      remoteAddr: context.request.headers['remote-addr'],
      httpVia: context.request.headers['via'],
      httpXForwardedFor: context.request.headers['x-forwarded-for'],
    }

    const userAgent = context.request.headers['user-agent']
    
    const ipInfo = await getGeoInfo(ip)
    
    const deviceInfo = new uaDevice(userAgent)
    
    const browser = {
      name: deviceInfo.browser.name ? deviceInfo.browser.name : '',
      version: deviceInfo.browser.version ? deviceInfo.browser.version.original : '',
    }
    
    const engine = {
      name: deviceInfo.engine.name ? deviceInfo.engine.name : '',
      version: deviceInfo.engine.version ? deviceInfo.engine.version.original : '',
    }
    
    const os = {
      name: deviceInfo.os.name ? deviceInfo.os.name : '',
      version: deviceInfo.os.version ? deviceInfo.os.version.original : '',
    }
    
    const device = {
      type: deviceInfo.device.type ? deviceInfo.device.type : '',
      manufacturer: deviceInfo.device.manufacturer ? deviceInfo.device.manufacturer : '',
      model: deviceInfo.device.model ? deviceInfo.device.model : '',
    }
    
    await RecordModel.insertMany([
      {
        uuid,
        belongs,
        ip,
        ipLocation: ipInfo,
        proxy,
        userAgent,
        browser,
        engine,
        os,
        device,
        createTime: Date.parse(new Date().toString()),
      },
    ])
    return true
  }

  async get(uuid: string): Promise<any> {
    const data = 
      await LinkModel.findOne({ uuid })
    if (!data)
      throw new NotFoundError(ERR_LINK_NOTFOUND)
    return { href: data.originalUrl }
  }
}
