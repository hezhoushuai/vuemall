import Axios from 'vuex'
export default {
  // 获取验证码
  getPhoneMessage (ctx) {
    Axios.get('http://rap2api.taobao.org/app/mock/167788/phoneImagine?id=1')
      .then(resp => {
        if (resp.status === 200) {
          console.log(1)
          ctx.commit('changeMessageCard', resp.data.body.data)
        } else {
          console.log('密码或者账号错误！')
        }
      })
  },
  // 登录请求
  doLogin (ctx) {
    Axios.get('http://rap2api.taobao.org/app/mock/167788/regustAddLogin?id=1')
      .then(resp => {
        // console.log(resp)
        // if (resp.status === 200) {
        //   console.log(1)
        //   ctx.commit('changeLoginStatus', resp.data.body.data)
        // } else {
        //   console.log('密码或者账号错误！')
        // }
      })
  }
}
