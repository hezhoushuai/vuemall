<template>
  <div class="yp-home">
    <div class="yp-home-header">
      <h1 class="yp-home-header_logo">
        <img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/navi_title_v4.png">
      </h1>
      <form class="yp-home-header_search">
        <i
        class="icon"
        @click="searchBtn"
        ></i>
        <input
        class="search"
        type="text"
        placeholder="有品心动卡"
        @keyup.enter="search1"
        >
      </form>
      <span class="yp-home-header_msg"></span>
    </div>

    <div class="yp-homes">
        <!-- 轮播 -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div
                class="swiper-slide"
                v-for="each in banner"
                :key="each.id"
                >
                <img :src="each.imageUrl" :alt="each.id">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

        <div class="yp-homes-nav">
            <ul class="yp-homes-nav-ul">
                <router-link
                class="yp-homes-nav-ul-list"
                tag="li"
                v-for="each in topList"
                :key="each.id"
                :to="`/GoodsByCategory/${each.id}`"
                >
                    <div class="yp-homes-nav-ul-list-img"><img :src="each.imageUrl" :alt="each.id"></div>
                    <span class="yp-homes-nav-ul-list-info">{{each.title}}</span>
                </router-link>
            </ul>
        </div>

        <div class="yp-homes-show">
            <div class="yp-homes-show-box">
                <router-link
                    class="yp-homes-show-box-list"
                    tag="div"
                    v-for="each in gridsV2"
                    :key="each.id"
                    :to="`/detail/${each.id}`"
                >
                    <div class="yp-homes-show-box-list-img">
                        <img :src="each.image" :alt="each.id">
                    </div>
                    <span class="ys-homes-show-box-list-binfo">{{each.title}}</span>

                </router-link>
            </div>
        </div>

        <div class="yp-homes-money">
            <router-link
            to="/"
            >
                <img src="https://img.youpin.mi-img.com/jianyu/f66013ea98c9f887a42f4dd082fa1891.png@base@tag=imgScale&w=1080&h=210" alt="">
            </router-link>
        </div>

        <div class="yp-homes-more">
            <span class="yp-homes-more-left">小米众筹</span>
            <span class="yp-homes-more-right">更多 <span v-html="icon"></span> </span>
        </div>

        <div class="yp-homes-show-big">
            <router-link
            class="yp-homes-show-big-banner"
            tag="div"
            v-for="each in morelist"
            :key="each.id"
            :to="`/detail/${each.id}`"
            >
                <img :src="each.image" :alt="each.id">
                <span>{{each.title}}</span>
            </router-link>
        </div>

        <!-- 倒计时 -->
        <div class="yp-homes-time">
          <div class="time">
            <span class="untime">限时购</span>
            <span class="start">距离开场 :</span>
            <count-down v-on:end_callback="countDownE_cb()" :startTime="startTime" :endTime="endTime" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
          </div>
          <span>更多 <span v-html="icon"></span></span>
        </div>

        <!-- 滑动的图片 -->
        <div class="hidescrolls">
          <ul class="yp-homes-scrollpic">
            <router-link
            tag="li"
            v-for="each in alllist"
            :key="each.id"
            :to="`/detail/${each.id}`"
            >
                <img :src="each.image" alt="">
                <p class="title">{{each.title}}</p>
                <span class="price">￥{{each.price}}</span>
                <span class="oprice">￥{{each.originPrice}}</span>
            </router-link>
        </ul>
        </div>

        <!-- 每日上新 -->
        <div class="yp-homes-new">
            <img src="https://img.youpin.mi-img.com/jianyu/6e07bb7ea1fafd25b5c938ef876c9279.jpeg?w=1080&h=234" alt="">
        </div>

        <!-- newpro -->
        <ul class="yp-homes-newpro">
            <router-link
            tag="li"
            v-for="each in getnewPro"
            :key="each.id"
            :to="`/detail/${each.id}`"
            >
                <div class="imgbox">
                  <img :src="each.image" alt="each.id">
                </div>
                <p>{{each.title}}</p>
                <i>新品</i>
                <span class="couponValue">{{each.couponValue}}</span>
                <div>
                    <span class="price">{{each.price}}</span>
                    <span class="oprice">{{each.originPrice}}</span>
                    <!-- <span class="couponValue">{{each.couponValue}}</span> -->
                </div>
            </router-link>
        </ul>

        <!-- 品味生活 -->
        <div class="yp-live">
            <span class="yp-homes-more-left">品味生活</span>
            <span class="yp-homes-more-right">更多 <span v-html="icon"></span> </span>
        </div>
        <div class="hidescroll">
          <ul class="yp-homes-live">
            <router-link
            tag="li"
            v-for="each in alllist"
            :key="each.id"
            :to="`/detail/${each.id}`"
            >
                <img :src="each.image" alt="">
                <p class="title">{{each.title}}</p>
            </router-link>
          </ul>
        </div>

        <!-- 更所好物 -->
        <div class="yp-home-goods">
          ------ 更多好物敬请期待 ------
        </div>

        <!-- 固定 -->
        <div class="yp-homes-jiang">
          <img src="https://img.youpin.mi-img.com/editor1/5f143a94bd15b9e7c93627f32444b346.png?w=200&h=200">
        </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.css'
import CountDown from 'vue2-countdown'

export default {
  components: {
    CountDown
  },
  data () {
    return {
      banner: [],
      topList: [],
      gridsV2: [],
      morelist: [],
      alllist: [],
      getnewPro: [],
      search: '',
      startTime: (new Date()).getTime(),
      endTime: (new Date()).getTime() + (1000 * 1000),
      icon: '&#xe63c'
    }
  },
  methods: {
    Swiper () {
      this.swiper = new Swiper('.swiper-container', {
        autoplay: true,
        // 循环模式选项
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    },
    // 倒计时结束后的回调
    countDownE_cb: function () {
      document.querySelector('.start').remove()
    },
    // search获取数据
    search1 (e) {
      const inputvalue = e.target.value
      this.search = inputvalue
      this.$router.push({
        path: '/GoodsByCategory/-1',
        query: {
          keyvalue: inputvalue
        }
      })
    },

    searchBtn (e) {
      // 点击搜索跳转页面
      this.$router.push('/Mall')
    }

  },
  created () {
    this.$http.getimg()
      .then(res => {
        this.banner = res.data.data.banners
        this.$nextTick(() => {
          this.Swiper()
        })
      })

    this.$http.detNavdata()
      .then(resp => {
        this.topList = resp.data.data.categories.splice(1, 5)
        this.gridsV2 = resp.data.data.items.list.splice(5, 4)
        this.morelist = resp.data.data.items.list.splice(9, 2)
        this.alllist = resp.data.data.items.list
        this.topList.map(each => {
          each.id = each.url.slice(each.url.indexOf('=') + 1)
        })
      })

    this.$http.getnewPro()
      .then(resp => {
        // resp.data.data.items.list.push([])
        this.getnewPro = resp.data.data.items.list
      })
  }
}
</script>

<style lang="scss" scoped>
.yp-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-header {
  display: flex;
  height: 28px;
  line-height: 28px;
  width: 100%;
  position: sticky;
  margin: .5rem 0;

  form {
    flex: 1;
  }

  &_logo {
    width: 64px;
    height: 100%;
    position: relative;

    > img {
      max-width: 100%;
      height: 100%;
    }
  }

  &_search {
    display: flex;
    background-color: #eee;
    width: 67%;
    align-items: center;
    border-radius: 2px;

    > .icon {
      display: inline-block;
      width: 13px;
      height: 13px;
      background-image: url(https://cbu01.alicdn.com/cms/upload/2017/294/133/3331492_2093810242.png);
      background-size: 13px 13px;
      margin: 0 4px;
    }

    > input {
      flex: 1;
      border: none;
      background: #eeeeee;
      font-size: 12px;
      outline: none;
    }
  }

    &_msg {
      height: 100%;
      width: 28px;
      background: url(https://m.youpin.mi.com/youpin/static/m/res/images/std_titlebar_home_message.png) no-repeat center center;
      background-size: 32px;
      margin-left: 4px;
    }
  }

// home
.yp-homes{
    flex: 1;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    background: #eee;
    .swiper-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: percentage(140/375);
        .swiper-wrapper{
            position: absolute;
            top: 0;
            left: 0;
            img{
              width: 100%;
            }
        }
    }
    .yp-homes-nav{
        position: relative;
        background: #fff;
        width: 100%;
        height: 0;
        padding-top: percentage(80/375);
        &-ul{
            width: 100%;
            position: absolute;
            top: 0;
            &-list{
                float: left;
                width: 20%;
                &-img{
                    margin: 0 auto;
                    width: 62%;
                    height: 62%;
                    margin-top: 5px;
                    img{
                        width: 100%;
                    }
                }
                &-info{
                    margin: 0 auto;
                    display: block;
                    width: 100%;
                    height: 14%;
                    text-align: center;
                    margin-top: 8px;
                    font-size: 12px;
                    color: rgb(85, 86, 102)
                }
            }
        }
    }
    .yp-homes-show{
        margin-bottom: 10px;
        width: 100%;
        height:0;
        padding-top: percentage(255/375);
        position: relative;
        &-box{
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            &-list{
                float: left;
                background: #fff;
                margin: 5px 1%;
                width: 48%;
                height: 48%;
                position: relative;
                &-img{
                    margin: 0 auto;
                    width: 48%;
                    height: 70%;
                    margin-top: 5px;
                    img{
                        height: 100%;
                        }
                }
                span{
                    display: inline-block;
                    margin: 5px;
                    height: 20px;
                    width: 95%;
                    font-size: 12px;
                    text-align: center;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .yp-homes-money{
        width: 100%;
        height: 0;
        padding-top: percentage(75/375);
        position: relative;
        img{
            width: 100%;
            position: absolute;
            top: 0;
        }
    }
    .yp-homes-more{
        // background: #fff;
        background: linear-gradient(to top right, rgb(245, 223, 224) 0%, rgb(214, 244, 245) 25%, rgb(247, 228, 230) 100%);
        width: 100%;
        min-height: 44px;
        line-height: 44px;
        font-size: 13px;
        &-left{
            float: left;
            margin-right: 55%;
            margin-left:3%;
            font-weight: 700;
        }
        &-right{
            font-family: 'iconfont';
            font-size: 13px;
            float: right;
            padding-right: 20px;
        }
    }
    .yp-homes-show-big{
        margin: 0 auto;
        width: 95%;

        &-banner{
            background: #fff;
            height: 49%;
            // border-bottom: 3px solid #bbb;
            position: relative;
            margin: 8px 0;
            img{
                width: 35%;
                padding-left: 10%;
                padding-top: 4%;
            }
            span{
                position: absolute;
                top: 38px;
                right: -18px;
                // float: right;
                width: 40%;
                min-height: 40px;
                padding-right: 10%;
                margin-top: 4%;
                font-size: 14px;
                background-image: -webkit-gradient(linear, left 0, right 0, from(rgb(236, 97, 132)), to(rgb(209, 253, 10)));
                background-clip: text;
                -webkit-text-fill-color: transparent;

            }
        }
    }
    .yp-homes-time{
        min-height: 40px;
        width: 100%;
        // background: #fff;
        background: linear-gradient(to top right, rgb(245, 223, 224) 0%, rgb(214, 244, 245) 25%, rgb(247, 228, 230) 100%);
        margin: 10px 0 ;
        display: flex;
        justify-content: space-between;
        > span {
          font-family: 'iconfont';
          line-height: 40px;
          font-size: 13px;
          padding-right: 20px;
        }
        div{
          height: 40px;
          line-height: 40px;
          padding-right:0 10px;
          font-size: 13px;
          &.time{
            display: flex;
            font-weight: 700;
            > span{
              display: inline-block;
              height: 40px;
              line-height: 40px;
              &.untime{
                padding: 0 6px;
                color: rgb(243, 9, 9);
                font-size: 15px;
              }
            }

            div:nth-child(3){
              min-width: 130px;
              margin-left: 5px;
              align-self: center;
              background: rgb(185, 47, 29);
              border-radius: 10px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              color: #fff;
            }
          }
        }
    }
  .hidescrolls{
    height: 180px;
    overflow: hidden;
  .yp-homes-scrollpic{
        height: 200px;
        display: flex;

        overflow-y: hidden;
        li{
            width: 30%;
            min-height: 175px;
            margin: 10px;
            img{
                width: 100%;
            }
            .title{
                height: 15px;
                margin: 12px 0 ;
                font-size: 13px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .price{
                color: red;
                font-weight: 700;
            }
            .oprice{
                display: inline-block;
                font-size: 12px;
                text-decoration:line-through
            }
        }
      }
  }
    .yp-homes-new{
        margin: 10px 0;
        min-height: 82px;
        width: 100%;
        img{
          width: 100%;
        }
    }
    .yp-homes-newpro{
        // height: 426px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        // justify-content: start;
        li{
            margin: 5px 0.6%;
            padding-bottom: 3px;
            width: 32%;
            min-height: 170px;
            background: #fff;
            i{
                display: inline-block;
                height: 15px;
                width: 30px;
                margin-left: 3px;
                margin-bottom: 5px;
                background: red;
                border-radius: 5px;
                text-align: center;
                color: #fff;
                font-size: 12px;
                font-weight: 500;
            }
            .imgbox{
              width: 100%;
              padding-top:100%;
              height: 0;
              overflow: hidden;
              position: relative;
              img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
              }
            }
            p{
                text-align: center;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                margin:10px 0;
                font-size: 12px;
            }
            .couponValue{
                  height: 12px;
                  margin-top: 3px;
                  margin-right: 2px;
                  float: right;
                  border: 1px solid red;
                  border-radius: 4px;
                  font-size: 12px;
                  color: red;
              }
            div{
                .price{
                    color: red;
                    font-size: 14px;
                }
                .oprice{
                    margin-left: 5px;
                    font-size: 12px;
                    text-decoration: line-through;
                    color: #888;
                }
            }
        }
    }
    .yp-live{
        // background:#fff;
        background: linear-gradient(to top right, rgb(245, 223, 224) 0%, rgb(214, 244, 245) 25%, rgb(247, 228, 230) 100%);
        width: 100%;
        min-height: 44px;
        line-height: 44px;
        font-size: 13px;
        margin: 10px 0;
        &-left{
            float: left;
            margin-right: 55%;
            margin-left:3%;
            font-weight: 700;
        }
        &-right{
            float: right;
            padding-right: 40px;
        }
    }
    .hidescroll{
      min-height: 180px;
      overflow: hidden;
      .yp-homes-live{
        height: 200px;
        display: flex;
        overflow-y: hidden;
        li{
            background:#fff;
            width: 43%;
            min-height: 170px;
            margin: 10px;
            img{
                width: 100%;
            }
            .title{
                height: 15px;
                margin:15px 0 ;
                font-size: 13px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
    }
    .yp-home-goods{
      width: 100%;
      height: 160px;
      line-height: 160px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }

    .yp-homes-jiang{
      width: 56px;
      height: 54px;
      position: fixed;
      bottom: 120px;
      right: 20px;
      img{
        width: 100%;
      }
    }
}

}
</style>
