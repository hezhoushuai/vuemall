<template>
    <div class="yp-islogin-contenner">
        <transition name="cartoon">
            <div
            class="yp-islogin-modelo"
            v-if="show"
            >
            您验证码为:
                <span>{{securityCode}}</span>
            </div>
        </transition>
        <div class="yp-islogin-header">欢迎登录小米有品</div>
        <div class="yp-islogin-main">
            <div class="yp-islogin-main__phone">
                <span v-if="isPhoneLogin">+86 ></span>
                <input
                type="text"
                v-if="isPhoneLogin"
                placeholder="手机号码"
                id="phoneNumber"
                @keyup="changeStyle"
                />
                <!-- 用户输入邮箱/手机号码/小米ID -->
                <input v-else=""
                type="text"
                placeholder="邮箱/手机号码/小米ID"
                id="account"
                @keyup="changeStyle"/>
            </div>
            <div class="yp-islogin-main__phoneMessage">
                <input
                type="text"
                v-if="isPhoneLogin"
                placeholder="短信验证码"
                id="phoneImagine"
                @keyup="changeStyle"
                />
                <input type="password" placeholder="密码" v-else="" id="password" @keyup="changeStyle"/>
                <span  v-if="isPhoneLogin" @click="getPhoneImagine">
                  <span v-show="resend">重获验证码(</span>
                  {{this.time}}
                  <span v-show="resend">)</span>
                </span>
                <span v-if="isPhoneLogin"></span>
                <span v-else="" @click="passwordShow" id="eyes">&#xe6be;</span>
            </div>
            <div class="yp-islogin-main__error"><span>&#xe614;</span>{{this.error}}</div>
            <div class="yp-islogin-main__styleError"><span>&#xe614;</span>{{this.styleError}}</div>
            <mt-button
            type="danger"
            size="large"
            class="yp-islogin-main__loginBtn"
            v-if="isPhoneLogin"
            @click="usePhoneLoginBtn"
            >
            立即登录/注册
            </mt-button>
            <mt-button type="danger" size="large" class="yp-islogin-main__loginBtn" v-else="" @click="useNameLoginBtn">登录</mt-button>
            <!-- 登录按钮 -->
            <div class="yp-islogin-main__nameLogin" @click="useNameLogin"  v-if="isPhoneLogin">用户名密码登录</div>
            <div class="yp-islogin-main__nameLogin" @click="useNameLogin" v-else="">手机短信登录/注册</div>
            <div class="yp-islogin-main__isForget"  v-if="isPhoneLogin">
              <router-link to="/RegisterNow">
                <span>立即注册</span>
              </router-link>
                <span class="line">|</span>
              <router-link to="/ForgetPassword">
                <span>忘记密码？</span>
              </router-link>
            </div>
            <div class="yp-islogin-main__other">
                <h3>其他方式登录</h3>
                <div>
                    <span>&#xe6f2;</span>
                    <span>&#xe604;</span>
                    <span>&#xe7fb;</span>
                </div>
            </div>
        </div>
        <div class="yp-islogin-footer">
            <ul class="yp-islogin-footer__content">
                <li>简体</li>
                <span>|</span>
                <li>繁体</li>
                <span>|</span>
                <li>English</li>
                <span>|</span>
                <li>常见问题</li>
                <span>|</span>
                <li>隐私政策</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
// 手机号验证规则
var reg = /^1[3|4|5|7|8][0-9]{9}$/
var fromRouter = ''
export default {
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('isLoginStatus')) {
      next('/Mine')
    } else {
      // 弹图框，用户与企业之间的协议；
      MessageBox({
        title: '声明与政策',
        message: '` <div>欢迎来到小米有品！</div><span>我们依据最新的法律法规要求，制定并更新了<a href="https://m.youpin.mi.com/app/shop/content?id=r094e903984fc84d4">《隐私政策》</a></span>、<a href="https://m.youpin.mi.com/app/shop/content?id=V04609039c13d40e3">《小米有品用户协议》</a>以及<a href="https://m.youpin.mi.com/app/shop/content?id=n6bbe9039974f5c51">《小米账号使用协议》</a><div>您需阅读并同意相关政策条款方可进行登录。</div>`',
        showCancelButton: true
      }).then(action => {
        // console.log(to)
        if (action === 'confirm') {
          next(vm => {
            fromRouter = from.fullPath
          })
        } else {
          next('/Mine')
        }
      })
    }
  },
  data () {
    return {
      isPhoneLogin: true,
      securityCode: '',
      show: false,
      error: '手机号格式不正确!',
      styleError: '验证码格式不正确!',
      time: '获取验证码',
      resend: false,
      padShow: true
    }
  },
  methods: {
    useNameLogin () {
      this.time = '获取验证码！'
      this.isPhoneLogin = !this.isPhoneLogin
      document.querySelector('.yp-islogin-main__styleError').style.display = 'none'
      document.querySelector('.yp-islogin-main__error').style.display = 'none'
      document.querySelector('.yp-islogin-main__phone').style.borderColor = '#bdbaba'
      document.querySelector('.yp-islogin-main__phoneMessage').style.borderColor = '#bdbaba'
    },
    // 获取短信验证码
    getPhoneImagine () {
      var phoneNumber = Number(document.querySelector('#phoneNumber').value)
      if (phoneNumber === 0) {
        // console.log('请输入手机号')
        document.querySelector('.yp-islogin-main__phone').style.borderColor = '#f40'
        document.querySelector('.yp-islogin-main__error').style.display = 'block'
      } else {
        if (reg.test(phoneNumber)) {
          // 启动定时器
          window.clearInterval(window.timeout)
          this.time = 60
          this.resend = true
          window.timeout = setInterval(() => {
            this.time--
            if (this.time === 0) {
              window.clearInterval(window.timeout)
              this.time = '获取验证码'
              this.resend = false
            }
          }, 1000)
          this.$http.getPhoneImagine(phoneNumber)
            .then(resp => {
              this.securityCode = resp.body.data[0].securityCode
              this.show = true
              // 定时器：5秒以后提示框消失；
              setTimeout(() => {
                this.show = false
              }, 5000)
            })
        } else {
          document.querySelector('.yp-islogin-main__phone').style.borderColor = '#f40'
          document.querySelector('.yp-islogin-main__error').style.display = 'block'
        }
      }
    },
    // 点击登录电话号码登录按钮，进行登录和注册；
    usePhoneLoginBtn () {
      this.error = '手机号格式不正确!'
      this.styleError = '验证码格式不正确!'
      var phoneNumber = document.querySelector('#phoneNumber').value
      var phoneImagine = Number(document.querySelector('#phoneImagine').value)
      if (reg.test(phoneNumber)) {
        if (this.securityCode === phoneImagine) {
          this.$http.login({ phoneNumber, phoneImagine })
            .then(resp => {
              if (resp.code === 200) {
                // 登录成功，存数据，跳转页面；
                localStorage.setItem('isLoginStatus', JSON.stringify(resp.data))
                this.$router.push(fromRouter)
              }
            })
        } else {
          // alert("验证码格式不正确！")
          document.querySelector('.yp-islogin-main__phoneMessage').style.borderColor = '#f40'
          document.querySelector('.yp-islogin-main__styleError').style.display = 'block'
        }
      } else {
        // alert('请输入正确的手机号格式！')
        document.querySelector('.yp-islogin-main__phone').style.borderColor = '#f40'
        document.querySelector('.yp-islogin-main__error').style.display = 'block'
      }
    },
    // 使用用户名登录
    useNameLoginBtn () {
      // console.log('获取信息')
      this.error = '请输入用户信息!'
      this.styleError = '请输入密码!'
      var user = document.querySelector('#account').value
      var userpassword = document.querySelector('#password').value
      if (user !== '') {
        if (userpassword !== '') {
          this.$http.login({ user, userpassword })
            .then(resp => {
              if (resp.code === 200) {
                // 登录成功，存数据，跳转页面；
                localStorage.setItem('isLoginStatus', JSON.stringify(resp.data))
                this.$router.push(fromRouter)
              } else {
                console.log('用户名或密码错误')
              }
            })
        } else {
          // alert('请输入密码！')
          document.querySelector('.yp-islogin-main__phoneMessage').style.borderColor = '#f40'
          document.querySelector('.yp-islogin-main__styleError').style.display = 'block'
        }
      } else {
        // alert('请输入邮箱/手机号码/小米ID！')
        document.querySelector('.yp-islogin-main__phone').style.borderColor = '#f40'
        document.querySelector('.yp-islogin-main__error').style.display = 'block'
      }
    },
    changeStyle () {
      document.querySelector('.yp-islogin-main__styleError').style.display = 'none'
      document.querySelector('.yp-islogin-main__error').style.display = 'none'
      document.querySelector('.yp-islogin-main__phone').style.borderColor = '#bdbaba'
      document.querySelector('.yp-islogin-main__phoneMessage').style.borderColor = '#bdbaba'
    },
    passwordShow () {
      if (this.padShow) {
        document.getElementById('password').setAttribute('type', 'text')
        document.getElementById('eyes').style.color = '#A98D63'
        this.padShow = !this.padShow
      } else {
        document.getElementById('password').setAttribute('type', 'password')
        document.getElementById('eyes').style.color = '#999'
        this.padShow = !this.padShow
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    .yp-islogin{
        &-modelo{
            width: 36%;
            height: 50px;
            font-size: 14px;
            text-align: center;
            line-height: 50px;
            border: 1px solid rgb(189, 186, 186);
            margin: 0 auto;
            position: absolute;
            left: 50%;
            margin-top:10px;
            margin-left: -18%;
            > span{
                font-size: 16px;
                color: rgb(190, 11, 11);
            }
        }
        &-header{
            width: 100%;
            height: 165px;
            color: #666666;
            font-size: 23px;
            text-align: center;
            line-height: 165px;
        }
        &-main{
            font-size: 16px;
            padding: 0 30px;
            &__phone{
                width: 100%;
                height: 45px;
                border-bottom: 1px solid rgb(189, 186, 186);
                line-height: 45px;
                color: #666;
                >input{
                    width: 84.5%;
                    height: 40px;
                    box-sizing: border-box;
                    border: none;
                    outline: none;
                }
            }
            &__phoneMessage{
                width: 100%;
                height: 45px;
                border-bottom: 1px solid rgb(189, 186, 186);
                line-height: 45px;
                margin-bottom: 13px;
                >input{
                    width: 63.5%;
                    height: 39px;
                    border: none;
                    outline: none;
                }
                > span{
                    color:#A98D63;
                    font-family: 'iconfont';
                    float: right;
                    display: flex;
                    > .resends,
                    > .resend{
                      display: none;
                      font-size: 13px;
                    }
                }
            }
            &__error,
            &__styleError{
                display: none;
                color: #f40;
                > span{
                    font-family: 'iconfont';
                    padding: 0 2px;
                }
            }
            &__loginBtn{
                width: 100%;
                border-radius: 50px;
                margin: 13px auto;
                background: #ff6700;
            }
            &__nameLogin{
                margin: 40px 0;
                font-size: 14px;
                color: #666666;
            }
            &__isForget{
                width: 168px;
                height: auto;
                margin: 0 auto;
                color: #9b9b9b;
                display: flex;
                justify-content: space-between;
                > .line{
                    color: #000;
                }
            }
            &__other{
                width: 50%;
                color: #666666;
                text-align: center;
                height:20px ;
                margin: 50px auto;
                font-size: 14px;
                >div{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 25px;
                    > span{
                        font-family: 'iconfont';
                        font-size: 32px;
                        color: #08ca22d3;
                    }
                }
            }
        }
        &-footer{
            width: 100%;
            position: fixed;
            bottom: 0;
            &__content{
                padding: 0 20px 0 20px;
                list-style:none;
                width: 100%;
                height: 45px;
                font-size: 14px;
                display: flex;
                box-sizing: border-box;
                justify-content: space-between;
                color: #666;
            }
        }
    }
</style>
