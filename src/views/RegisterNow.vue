<template>
  <div class="yp-register-contenner">
    <div v-show="isShow" class="yp-register-countryinput">
      <div class="yp-register-header">注册小米账号</div>
      <div class="yp-register-registerMessage">
        <div class="yp-register-registerMessage__country" @click="chooseCountry">
          <span id="countryName" class="yp-register-registerMessage__country__countryName">{{Country}}</span>
          <span>icon</span>
        </div>
        <div class="yp-register-registerMessage__text">成功注册帐号后，国家/地区将不能被修改</div>
        <input type="text" @keyup="inputNumber" placeholder="请输入手机号码" id="phoneNumber" class="yp-register-registerMessage__phoneinpput">
        </div>
        <div v-show="agree" class="yp-register-agree">请同意您的条款！</div>
        <div v-show="isphone" class="yp-register-isphone">请输入你的电话号码!</div>
        <mt-button type="danger" size="large" class="yp-register-registerbtn" @click="registerBtn">注册</mt-button>
        <div class="yp-register-registeragreement">
          <input type="checkbox" id="ischecked" @click="checkedChange">
          <span>icon</span>
          <a href="https://static.account.xiaomi.com/html/agreement/account/cn.html">注册帐号即表示您同意并愿意遵守小米 </a>
          <a href="https://www.mi.com/about/privacy/" class="inspect_link privacy_link" title=" 隐私政策 " target="_blank">隐私政策</a>
          和
          <a href="https://static.account.xiaomi.com/html/agreement/account/cn.html" class="inspect_link agreement_link" title="用户协议" target="_blank">用户协议</a>
        </div>
        <div class="yp-register-footer">
          <ul class="yp-register-footer__coontenner">
            <li>简体</li>
            <span>|</span>
            <li>繁体</li>
            <span>|</span>
            <li>English</li>
            <span>|</span>
            <li>常见问题</li>
          </ul>
        </div>
    </div>
    <div v-show="isCountryList" class="yp-register-countrylist">
      <div class="yp-register-countrylist-countrys" v-for="item in countryList" :key="item.index">
        <div class="yp-register-countrylist-countrys__initial">{{item.index}}</div>
        <div>
          <div class="yp-register-countrylist-countrys__country" @click="shureCountry" v-for="title in item.title" :key="title.index">
          <span>{{title}}</span>
          </div>
        </div>
      </div>
      <div class="yp-register-countrylist__cancel" @click="shureCountry">取消</div>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true,
      isCountryList: false,
      Country: '中国',
      agree: false,
      isphone: false,
      countryList: [{
        index: 'A',
        title: ['Andorra', 'Afghanistan', 'Antigua and Barbuda', 'Anguilla', 'Albania']
      }, {
        index: 'B',
        title: ['Bosnia and Herzegovina', 'Barbados', 'Bangladesh', 'Belgium', 'Burkina Faso']
      }, {
        index: 'C',
        title: ['Canada', 'Central African Republic', 'Congo', 'Cote dlire']
      }, {
        index: 'D',
        title: ['Djibouti', 'Denmark', 'Dominica', 'Dominica', 'Dominican Republic']
      }, {
        index: 'E',
        title: ['Ecuador', 'Estonia', 'Egypt', 'EEritrea', 'Ethiopia']
      }, {
        index: 'F',
        title: ['Finland', 'Finland', 'Finland', 'Finland', 'Finland', 'Finland', 'Finland', 'Finland']
      }, {
        index: 'G',
        title: ['Germany', 'Germany', 'Germany', 'Germany', 'Germany', 'Germany']
      }, {
        index: 'H',
        title: ['Hong Kong', 'Hong Kong', 'Hong Kong', 'Hong Kong']
      }, {
        index: 'I',
        title: ['Indonesia', 'Indonesia', 'Indonesia', 'Indonesia', 'Indonesia']
      }, {
        index: 'J',
        title: ['Jersey', 'Jersey', 'Jersey', 'Jersey', 'Jersey']
      }, {
        index: 'K',
        title: ['Kenya', 'Kenya', 'Kenya', 'Kenya']
      }, {
        index: 'L',
        title: ['Laos', 'Laos', 'Laos', 'Laos']
      }, {
        index: 'M',
        title: ['Micronesia', 'Micronesia', 'Micronesia', 'Micronesia']
      }, {
        index: 'N',
        title: ['North Korea', 'North Korea', 'North Korea', 'North Korea']
      }, {
        index: 'O',
        title: ['Oman', 'Oman', 'Oman', 'Oman']
      }, {
        index: 'P',
        title: ['Panama', 'Panama', 'Panama', 'Panama']
      }, {
        index: 'Q',
        title: ['Qatar', 'Qatar', 'Qatar', 'Qatar', 'Qatar']
      }, {
        index: 'R',
        title: ['Reunion', 'Reunion', 'Reunion', 'Reunion', 'Reunion']
      }, {
        index: 'S',
        title: ['Saint Barthelemy', 'Saint Barthelemy', 'Saint Barthelemy', 'Saint Barthelemy', 'Saint Barthelemy']
      }, {
        index: 'T',
        title: ['The Democratic Tepublic Of Congo', 'The Democratic Tepublic Of Congo', 'The Democratic Tepublic Of Congo']
      }, {
        index: 'U',
        title: ['United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates', 'United Arab Emirates']
      }, {
        index: 'V',
        title: ['Vatican', 'Vatican', 'Vatican', 'Vatican', 'Vatican', 'Vatican']
      }, {
        index: 'W',
        title: ['Vatican', 'Vatican', 'Vatican', 'Vatican', 'Vatican', 'Vatican', 'Vatican']
      }, {
        index: 'Y',
        title: ['Wallis And Futuna', 'Wallis And Futuna', 'Wallis And Futuna', 'Wallis And Futuna']
      }, {
        index: 'Z',
        title: ['Zimbabwe', 'Zimbabwe', 'Zimbabwe', 'Zimbabwe', 'Zimbabwe', 'Zimbabwe']
      }
      ]
    }
  },
  methods: {
    chooseCountry () {
      this.isShow = false
      this.isCountryList = 'ture'
      this.isbeforeNumber = 'false'
    },
    shureCountry (event) {
      this.isShow = 'ture'
      this.isCountryList = false
      this.Country = event.target.innerHTML
      if (event.target.idName === 'yp-register-registerMessage__country__countryName') {
      }
    },
    beforNumber () {
      this.isShow = false
      this.isCountryList = 'ture'
      this.isbeforeNumber = 'ture'
    },
    registerBtn () {
      var phoneNumber = document.querySelector('#phoneNumber').value
      this.agree = false
      if (phoneNumber) {
        if (document.querySelector('#ischecked').checked) {
          this.$router.push('./VerificationCode')
        } else {
          this.agree = 'ture'
        }
      } else {
        this.isphone = 'ture'
      }
    },
    inputNumber () {
      this.isphone = false
    },
    checkedChange () {
      if (document.querySelector('#ischecked').checked) {
        this.agree = false
      } else {
        this.agree = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.yp-register{
  &-header{
    width:100%;
    height: 100px;
    font-size: 20px;
    text-align: center;
    line-height: 100px;
  }
  &-registerMessage{
    width: 100%;
    height: 100px;
    padding: 0 20px;
    box-sizing: border-box;
    &__country{
      // width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      border-bottom:1px solid #999;
    }
    &__text{
      font-size: 13px;
      color: #999;
      padding: 5px 0px;
    }
    &__phoneinpput{
      width: 100%;
      height: 40px;
      font-size: 18px;
      border: none;
      border-bottom: 1px solid #999;
      outline: none;
    }
  }
  &-agree{
    padding: 20px 0px 0 20px;
    color: red;
  }
  &-isphone{
    padding: 20px 0px 0 20px;
    color: red;
  }
  &-registerbtn{
    width: 90%;
    margin: 50px auto;
  }
  &-registeragreement{
    font-size: 14px;
    padding: 0 20px;
  }
  &-footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
    &__coontenner{
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
  &-countrylist{
    padding: 20px 20px;
    // 国家列表
    &-countrys{
      width: 100%;
      &__initial{
        width: 100%;
        height: 30px;
        font-size: 18px;
        font-weight: 700;
        color: rgb(107, 106, 106)
      }
      &__country{
        width: 100%;
        height: 30px;
        font-size: 16px;
        color: #4a4a4a;
      }
    }
    // 取消按钮
    &__cancel{
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      background: #d4d2d2;
      position: fixed;
      bottom: 0;
    }
  }
}
</style>
