export const renderRegisterHtml = (activeCode: string, username: string, email: string, uuid: string): string =>
    `
      <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>验证你的邮箱</title>
          <meta charset="utf-8" />
          <link rel="stylesheet" href="https://unpkg.com/antd@3.19.5/dist/antd.min.css">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <style>
            body {
              padding-top: 30px;
            }
          </style>
        </head>
        <body>
        <div class="ant-row" style="display: flex; justify-content: center">
          <div class="ant-col ant-col-xs-20 ant-col-sm-16 ant-col-md-12 ant-col-lg-12 ant-col-xl-8">
            <div class="ant-card-bordered">
              <div class="ant-card-head">
                <div class="ant-card-head-wrapper">
                  <div class="ant-card-head-title">验证你的邮箱</div>
                </div>
              </div>
              <div class="ant-card-body">
                <p>尊敬的 <strong>${username}</strong> 阁下：</p>
                <p>在不久前，这个邮箱被用于注册 LinkStats 服务。但是，到目前为止，我们仍无法信任这个邮箱。因此，我们需要你点击下面的链接完成邮箱的验证：</p>
                <p>
                  <a href="https://linkstate.lenconda.top/#/active?user=${uuid}&code=${activeCode}" role="button" class="ant-btn ant-btn-primary ant-btn-lg">
                    验证邮箱地址
                  </a>
                </p>
                <p>如果上面的按钮无法跳转，请点击如下链接完成验证：</p>
                <p>
                  <a href="https://linkstate.lenconda.top/#/active?user=${uuid}&code=${activeCode}">
                    https://linkstate.lenconda.top/#/active?user=${uuid}&code=${activeCode}
                  </a>
                </p>
                <p>
                  如果你没有使用该邮箱注册 LinkStats 服务，请忽略这个邮件。
                </p>
                <p><strong>LinkStats 团队敬上</strong></p>
              </div>
            </div>
          </div>
        </div>
        </body>
        </html>
    `

export const renderResetHtml = (activeCode: string, username: string, email: string, uuid: string, time: number): string =>
    `
      <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>修改你的账户的密码</title>
          <meta charset="utf-8" />
          <link rel="stylesheet" href="https://unpkg.com/antd@3.19.5/dist/antd.min.css">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <style>
            body {
              padding-top: 30px;
            }
          </style>
        </head>
        <body>
        <div class="ant-row" style="display: flex; justify-content: center">
          <div class="ant-col ant-col-xs-20 ant-col-sm-16 ant-col-md-12 ant-col-lg-12 ant-col-xl-8">
            <div class="ant-card-bordered">
              <div class="ant-card-head">
                <div class="ant-card-head-wrapper">
                  <div class="ant-card-head-title">修改你的账户的密码</div>
                </div>
              </div>
              <div class="ant-card-body">
                <p>尊敬的 <strong>${username}</strong> 阁下：</p>
                <p>你在 ${new Date(time).toUTCString()} 时向我们发送了 <strong>忘记密码</strong> 请求。</p>
                <p>为了确认这是你本人的操作，请点击下面的按钮来验证你的邮箱，以便继续你先前的操作：</p>
                <p>
                  <a href="https://linkstate.lenconda.top/#/reset?user=${uuid}&code=${activeCode}" role="button" class="ant-btn ant-btn-primary ant-btn-lg">
                    修改密码
                  </a>
                </p>
                <p>如果上面的按钮无法跳转，请点击如下链接完成验证：</p>
                <p>
                  <a href="https://linkstate.lenconda.top/#/reset?user=${uuid}&code=${activeCode}">
                    https://linkstate.lenconda.top/#/reset?user=${uuid}&code=${activeCode}
                  </a>
                </p>
                <p>
                  如果这不是你本人的操作，请忽略这个邮件。但这意味着你的账户可能被包括但不限于社会工程学、暴力破解的黑客攻击。我们诚恳地提醒你对自己的账户安全加强防范，谢谢合作。
                </p>
                <p><strong>LinkStats 团队敬上</strong></p>
              </div>
            </div>
          </div>
        </div>
        </body>
        </html>
    `
