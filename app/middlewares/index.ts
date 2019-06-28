import { IRouterContext } from 'koa-router'
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { regenerateToken } from '../util/authorization'

@Middleware({ type: 'after' })
export class ResponseHandler implements KoaMiddlewareInterface {

  async use (ctx: IRouterContext, next: (err?: any) => Promise<any>) {
    const token = ctx.req.headers['authorization'] ?
        ctx.req.headers['authorization'].substring(7) : ''
    ctx.body = {
      message: 'OK',
      token: (token && !/.*\/auth\/.*/g.test(ctx.path)) ? regenerateToken(token) : '',
      status: 200,
      data: !!ctx.body ? ctx.body : {}
    }
    ctx.status = 200
    next()
  }

}
