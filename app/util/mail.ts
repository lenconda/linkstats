import nodemailer from 'nodemailer'
import config from '../../config'
import { renderRegisterHtml, renderResetHtml } from './mail_templates'

export const sendMail = (
    type: number,
    activeCode: string,
    username: string,
    email: string,
    uuid: string,
    time?: number) => {
  const transport = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    auth: {
      user: config.smtpUser,
      pass: config.smtpToken
    }
  })

  let registerMailOptions = {
    from: 'no-reply@lenconda.top',
    to: email,
    subject: `【LinkStats】${type === 0 ? '验证你的邮箱地址' : '修改你的账户的密码'}`,
    html: type === 0 ? renderRegisterHtml(activeCode, username, email, uuid) :
        renderResetHtml(activeCode, username, email, uuid, time)
  }

  transport.sendMail(registerMailOptions, (err, info) => {
    if (err)
      console.log(err)
  })
}
