<template>
  <div class="yp-mine" >
    <div class="yp-mine-header">
        <router-link class="yp-mine-header-logo" to="/Login">
          <img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icon_default_head_portrait.png" alt class="yp-mine-header-logo__headerImg">
          <span >{{this.isLoginName}}</span>
          <img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/device_shop_right_arrow.png" alt class="yp-mine-header-logo__right">
        </router-link>
    </div>
    <div class="yp-mine-order">
      <span>我的订单</span><span><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/device_shop_right_arrow.png" alt="" class="yp-mine-header-logo__orderRight"></span>
    </div>

    <ul class="yp-mine-listBox">
      <router-link
      v-for="item in list"
      :key="item.name"
      :to="item.path"
      tag="li"
      >
        <span class="icon" v-html="item.icon"></span>
        <span class="title">{{item.title}}</span>
      </router-link>
  </ul>

  <div class="yp-mine-logo">
    <img src="https://img.youpin.mi-img.com/jianyu/9cc9d83395d70606896dd1b5a1d03dbc.png@base@tag=imgScale&w=1080&h=312" alt="">
  </div>

  <ul class="yp-mine-classifyList">
    <router-link
      v-for="item in classifyList"
      :key="item.name"
      :to="item.path"
      tag="li"
    >
      <span class="icon" v-html="item.icon"></span>
      <span class="title" >{{item.title}}</span>
      <span class="rightIcon" v-html="item.right"></span>
      <span class="titles">{{item.description}}</span>
    </router-link>
  </ul>
  <div class="yp-mine-loginOut" @click="loginOut">退出</div>
  </div>
</template>

<script>
export default {
  created () {
    console.log(localStorage.getItem('isLoginStatus'))
    var isLoginStatus = JSON.parse(localStorage.getItem('isLoginStatus'))
    if (isLoginStatus) {
      this.isLoginName = isLoginStatus
    } else {
      this.isLoginName = '请登录'
    }
  },
  methods: {
    loginOut () {
      localStorage.removeItem('isLoginStatus')
      this.isLoginName = '请登录'
    }
  },
  data () {
    return {
      loginRout: '/Login',
      isLoginName: '请登录',
      list: [
        {
          title: '待付款',
          path: '/PayFor',
          icon: '&#xe62a;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '待收货',
          path: '/PayFor',
          icon: '&#xe647;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '待评价',
          path: '/PayFor',
          icon: '&#xe641;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '退款订单',
          path: '/PayFor',
          icon: '&#xe654;',
          meta: {
            isAuthRequired: true
          }
        }
      ],

      classifyList: [
        {
          title: '我的资产',
          description: '优惠券/积分',
          path: '/home',
          icon: '&#xe615;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '拼团订单',
          description: '',
          path: '/home',
          icon: '&#xe600;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '我的收藏',
          description: '',
          path: '/home',
          icon: '&#xe613;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '地址管理',
          description: '',
          path: '/home',
          icon: '&#xe652;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '消息中心',
          description: '',
          path: '/home',
          icon: '&#xe655;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '资质证照',
          description: '',
          path: '/home',
          icon: '&#xe642;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '协议规则',
          description: '',
          path: '/home',
          icon: '&#xe965;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        },
        {
          title: '帮助与反馈',
          description: '',
          path: '/home',
          icon: '&#xe6d7;',
          right: '&#xe6ec;',
          meta: {
            isAuthRequired: true
          }
        }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
html, body {
  background: rgb(204, 188, 188);
}
.yp-mine {
  &-header {
    width: 100%;
    height: 100px;
    background: url(https://m.xiaomiyoupin.com/youpin/static/m/res/images/personal_bg_top.png) no-repeat center center;
    background-size: 100% 100%;
    &-logo {
      &__headerImg {
        width: 60px;
        height: 60px;
        margin: 20px 20px 10px 25px;
      }
      span {
        position: relative;
        font-size: 14px;
        top: -30px;
        color: #ffffff;
      }
      &__right {
        width: 20px;
        height: 20px;
        float: right;
        margin: 40px 20px 0 0;
      }
    }
  }
  //  订单
  &-order{
    height: 40px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 20px;
    span{
      font-size: 14px;
    }
    img{
      width: 20px;
      height: 20px;
      margin-top: 10px;
    }
  }
  &-listBox{
    height: 72px;
    border-top: 1px solid #dedede;
    display: flex;
    align-items: flex-end;
    li {
      flex: 1;
      text-align: center;
      color: #787878;
      span {
        display: block;
        &.icon {
          font-family: "iconfont";
          font-size: 20px;
          height: 32px;
          line-height: 32px;
        }
        &.title {
          height: 20px;
          line-height: 12px;
          font-size: 12px;
        }
      }
    }
  }
  &-logo{
    width: 100%;
    height: 0;
    padding-top: calc(100% * 312 / 1080 );
    box-sizing: border-box;
    position: relative;
    img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  &-classifyList {
    list-style: none;
    li {
      height: 40px;
      margin: 0 20px;
      color: #787878;
      line-height: 40px;
      border-bottom: 1px solid #dedede;
      span {
        &.icon {
          font-family: "iconfont";
          font-size: 16px;
          // height: 32px;
          // line-height: 32px;
        }
        &.title {
          height: 20px;
          line-height: 12px;
          font-size: 14px;
          padding-left: 10px;
          box-sizing: border-box;
        }
        &.rightIcon,
        &.titles{
          font-family: "iconfont";
          float: right;
          font-size: 12px;
        }
      }
    }
  }
  &-loginOut{
    width: 25%;
    height: 2.5rem;
    background: #FFF;
    text-align: center;
    line-height: 2.5rem;
    // font-size: 0.2rem;
    border: 1px solid #999;
    border-radius: 1rem;
    margin:0 auto;
  }
}

@font-face {
  font-family: 'iconfont';  /* project id 1175318 */
  src: url('//at.alicdn.com/t/font_1175318_fw9jmp8j5yj.eot');
  src: url('//at.alicdn.com/t/font_1175318_fw9jmp8j5yj.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1175318_fw9jmp8j5yj.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1175318_fw9jmp8j5yj.woff') format('woff'),
  url('//at.alicdn.com/t/font_1175318_fw9jmp8j5yj.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1175318_fw9jmp8j5yj.svg#iconfont') format('svg');
}
</style>
