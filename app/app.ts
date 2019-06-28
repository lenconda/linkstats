import 'reflect-metadata'
import kcors from 'kcors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import { validateToken, getUserIDByToken } from './util/authorization'
import { useKoaServer, useContainer, Action } from 'routing-controllers'
import { Container } from 'typedi'
import config from '../config'
import { connect } from './database/connect'

const app = new Koa()

app.use(async(ctx, next): Promise<any> => {
  try { await next() } catch (e) {
    ctx.status = e.status || e.httpCode || 403
    ctx.body = {
      status: ctx.status || 403,
      message: e.message,
      data: e.errors ? e.errors : {}
    }
  }
})

connect()

app.use(kcors())

app.use(bodyParser())

if (config.isDev) app.use(logger())

let port: number = process.env.PORT ? parseInt(process.env.PORT) : 6217

useContainer(Container)
useKoaServer(app, {
  routePrefix: '/api',
  controllers: [__dirname + '/controllers/*.{ts,js}'],
  middlewares: [__dirname + '/middlewares/*.{ts,js}'],
  authorizationChecker: async (action: Action) => validateToken(action.request.headers['authorization']),
  currentUserChecker: async (action: Action) => getUserIDByToken(action.request.headers['authorization']).id,
  defaults: {
    paramOptions: { required: false }
  },
  defaultErrorHandler: false,
  classTransformer: false,
}).listen(port)
