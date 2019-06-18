import { IRouterContext } from 'koa-router'
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class ResponseHandler implements KoaMiddlewareInterface {

  async use (ctx: IRouterContext, next: (err?: any) => Promise<any>) {
    ctx.body = {
      message: 'OK',
      status: 200,
      data: !!ctx.body ? ctx.body : {}
    }
    ctx.status = 200
    next()
  }

}
