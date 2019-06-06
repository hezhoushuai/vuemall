<template>
  <div class="yp-detail">
    <div class="wraper">
    <div class="yp-detail-goback" @click="goback"></div>
    <div class="yp-detail-container">
      <div class="swiper-wraper">
        <mt-swipe :show-indicators="false" :auto="3000">
          <mt-swipe-item
            v-for="item in photos"
            class="yp-detail-photos"
            :key="item.id"
          >
            <img :src="item.url">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="yp-detail-title">
      <div class="yp-detail-title-price">
        <span class="price">
          <i>￥</i>
          {{detailData.detail.price | toFixed2(detailData.detail.price)}}
        </span>
        <span class="saleNum">月销量: {{detailData.detail.saleNum}}</span>
      </div>
      <div
        class="yp-detail-title_tit"
        v-if="isShowShopTitle"
      >店铺：{{detailData.detail.shop.title}}</div>
      <div class="yp-detail-title-header">
        <span class="origin"></span>
        <span class="by"></span>
        {{detailData.share.title}}
      </div>
      <div class="yp-detail-title_img"></div>
      <div class="yp-detail-title-check">
        <div class="yp-detail-title-check_num" @click="showNumberBox = !showNumberBox">
          <span class="title">已选</span>
          <span class="num">{{initialCount}}</span>
          <span class="to-detail"></span>
        </div>
        <div class="yp-detail-title-check_server">
          <span class="title">服务</span>
          <span v-if="detailData.detail.isFreePostage">满99包邮</span>
          <span v-if="!detailData.detail.isTianmao">有品三方</span>
          <span class="to-detail"></span>
        </div>
      </div>
      <article>
        <h2 class="title">图文详情</h2>
        <img
          v-for="item in imageList"
          :key="item.photo.id"
          :src="item.photo.url"
        >
      </article>
    </div>
  </div>

    <div class="yp-detail-addCart">
      <router-link tag="span" class="yp-detail-addCart_collcetion" to>收藏</router-link>
      <router-link tag="span" class="yp-detail-addCart_cart" to="/cart">
        购物车
        <cart-total class="total" />
      </router-link>
      <div class="yp-detail-addCart-btn">
        <div
          class="yp-detail-addCart-btn_addCart"
          @click="addGoodsToCart({
            title: detailData.share.title,
            id:detailData.detail.id,
            count: 1,
            price: detailData.detail.price,
            imgUrl: photos[0].url
          },addSuccess())"
        >加入购物车</div>
        <router-link tag="div" class="yp-detail-addCart-btn_buyNow" to>立即购买</router-link>
      </div>
    </div>
    <mt-popup v-model="showNumberBox" class="yp-detail-buynumbox" position="bottom">
      <div class="yp-detail-buynumbox-header">
        <div class="yp-detail-buynumbox-header_img">
          <img src="https://img.alicdn.com/bao/uploaded/i1/TB1gLngSXXXXXaZapXXXXXXXXXX_!!0-item_pic.jpg_600x600q90.jpg">
        </div>
        <div class="yp-detail-buynumbox-header_price">
          <p class="price"><i>￥</i>{{detailData.detail.price | toFixed2(detailData.detail.price)}}</p>
          <p class="count">已选：{{initialCount}}</p>
        </div>
      </div>
      <div class="yp-detail-buynumbox_addNum">
        <p>数量</p>
        <span class="decreaseCount" @click="changeInitialCount(false)">-</span>
        <span class="count">{{initialCount}}</span>
        <span class="increaseCount" @click="changeInitialCount(true)">+</span>
      </div>
      <div class="yp-detail-buynumbox-footer">
        <div
          class="yp-detail-buynumbox-footer_addToCart"
          @click="addGoodsToCart({
            title: detailData.share.title,
            id:detailData.detail.id,
            count: initialCount,
            price: detailData.detail.price,
            imgUrl: photos[0].url
          });addSuccess();"
        >加入购物车</div>
        <div class="yp-detail-buynumbox-footer_buyNow">立即购买</div>
      </div>
    </mt-popup>
    <back-top
      scroll-container=".yp-detail"
      :distance-to-show="800"
    />
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapMutations, mapState } from 'vuex'
import YpCartTotal from '@/components/YpCartTotal'
export default {
  components: {
    cartTotal: YpCartTotal
  },
  data () {
    return {
      detailData: {
        detail: {
          shop: {}
        },
        share: {}
      },
      photos: [],
      imageList: [{
        image: {},
        photo: {},
        type: 1
      }],
      showNumberBox: false,
      isShowShopTitle: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData()
    })
  },
  methods: {
    ...mapMutations([
      'addGoodsToCart',
      'changeInitialCount'
    ]),
    addSuccess () {
      Toast({
        message: '加入购物车成功...',
        position: 'middle',
        className: 'yp-toast',
        duration: 1000
      })
    },
    getData () {
      const { goodID } = this.$route.params
      this.$http.getDetail(goodID).then(resp => {
        this.detailData = resp.data.data
        this.photos = this.detailData.detail.photos
        this.imageList = resp.data.data.detail.descContentList
        this.imageList = resp.data.data.detail.descContentList.filter((value, index) => value.image)
        this.isShowShopTitle = resp.data.data.detail.shop !== ''
      })
    },
    goback () {
      this.$router.back()
    }
  },
  computed: {
    ...mapState([
      'initialCount'
    ])
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  font-size: 36px;
}
.yp-detail {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;

  .wraper{
    flex: 1;
    overflow-x: hidden;
  }

  &-addCart {
    display: flex;
    height: 3em;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #bfbfc0;

    &-btn {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
      margin-right: 0.4rem;

      > div {
        width: 50%;
        height: 2.3rem;
        line-height: 2.3rem;
        color: #fff;
        font-weight: bold;
        font-size: 13px;
        text-align: center;
      }

      &_addCart {
        background-color: #d1a96e;
        border-radius: 20rem 0 0 20rem;
      }

      &_buyNow {
        background-color: #bf1111;
        border-radius: 0 20rem 20rem 0;
      }
    }

    > span {
      display: inline-block;
      height: 100%;
      width: 3em;
      text-align: center;
      color: #7a7a7a;
      font-weight: 400;
      font-size: 12px;
      line-height: 6em;
      margin: 0 0.5rem;
    }

    &_collcetion {
      background: url(https://m.youpin.mi.com/youpin/static/m/res/images/device_shop_detail_unfavor_v3.png)
        no-repeat;
      background-size: 80%;
      background-position: center top;
    }

    &_cart {
      background: url(https://m.youpin.mi.com/youpin/static/m/res/images/shop_cart_v3.png)
        no-repeat;
      background-size: 80%;
      background-position: center top;
      position: relative;

      .total {
        position: absolute;
        top: -.2rem;
        right: -.3rem;
      }
    }
  }

  &-goback {
    position: fixed;
    top: 0.7em;
    left: 0.7em;
    width: 2em;
    height: 2em;
    z-index: 999;
    border-radius: 50%;
    background: url(http://img6.lukou.com/static/img/back-write.d142e02.png)
      no-repeat center center;
    background-size: 25%;
    background-color: #524336;
  }

  &-container {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;

    > .swiper-wraper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }

  &-title {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.4rem;

    &-price {
      display: flex;
      line-height: 25px;
      justify-content: space-between;
      margin-top: 0.3rem;

      > .price {
        font-weight: bold;
        font-size: 25px;
        color: #b60909;

        > i {
          font-size: 22px;
        }
      }

      > .saleNum {
        font-size: 12px;
        color: #b1a9a5;
      }
    }

    &_tit {
      color: #333333;
      font-weight: bold;
      font-size: 17px;
      margin: 0.5rem 0;
    }

    &-header {
      font-size: 14px;
      line-height: 1.6rem;
      vertical-align: middle;
      font-weight: 400;

      > span {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        position: relative;
        top: 0.2rem;
      }

      > .origin {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwM0NGNDY1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwM0NGNDc1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQzAzQ0Y0NDUzRDYxMUU3OUQ0QjkyRjdFOTE3ODQ1NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzAzQ0Y0NTUzRDYxMUU3OUQ0QjkyRjdFOTE3ODQ1NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PplzYJMAAAa9SURBVHja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)
          no-repeat;
        background-size: 100%;
        margin-right: 0.4rem;
      }

      > .by {
        width: 1.8rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAvCAYAAABuWa03AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDY0QjJFNzU2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDY0QjJFNzY2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjRCMkU3MzZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjRCMkU3NDZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu3eOnMAAASVSURBVHja7FxNaNRAFJ6ui+Ax+C+IkoMevAi5iCJ4yKLgQVS2qNCT2D2IiIh2LehNzeJd2MWDp6IuInpQsQFFUQSNJxVFG6woepAGPahorb4hL3YIm2lmMrtJ2nzwsds0nUy+vHk/mZn2nR0+SiIwD7gRuB64HLiQFODhO/AD8C3wLvBbp5PKEccOAIeBk0Ab+B7oFppy0QdcCewHjgBbwNPALzzBVwGvAn8D9wEfFDpKYTXwJPAFsAq8H/yixJy0BAWmFr2pEDsR3gH3o6e4BqyEBS/hLy4D68CpQjMluAHcC7yEVv9f8AHgAhS7gFrcAV4AnmF9+HHkHwUX0NBv2RkItLQvBn53U+wPFXucxkhq4WuAy4C3FTU+CGwCx4BDKQtOxR5FVlPsx1fgLeAOauEbgA8VWjcrcjuHLkAXeDgNgXZpErK5jEXNZ0WdHULRCeahbk4Ft2KeW8UMxItx7ifqSUqYsE8qGr6BdXtzKAB7Mc/7RWNmWeGFm8x3F325KjgYhNOoHqNiVDCKhVBW6EqMkLUbCm+8PoPgVsT1tJBQJqd9J2ZfTMay22kIbgj4vG5mI2YM36xzgr1oQG0LuBNlguuYcrGW0lAkohlqOw7sDiPBigjiuoTbY7OXlsxNJRGcWsUVxjraCsWWhd2hDxbTPzv0QEUFH2RiiiPTwVICsUcZv0kvXuuikFlIL03GJbVkGykpENtDsT3FN6hJpF7dRJXpS88EpyI/DYldwWN/JcmLD1mBxgieyG2KCq4zlheI7ZDZj8FQrJKGaNBsoz+1InJXJ2aFaSnO03vlTpyk8UQmS3EIM4PRocyNUxGK+uS0fXgLq0sDP2u9FDwNOAJD3+SMKk+i2GGzkiZew0kjD+9FGiZTiOmcgJ/Uyk10L1ZalWbW0O1Ks4aia9hubTYJrgm6k15Umh62b+Hf1kWtXLXgRsz3H4bAOV7GDKHNPMSqqC8vd8EqTUUPLktlffg1gztDvOiZ4G6SsjciYGZxmi4Q3MiC4KKlL+34GGM5WuhG8jgRnemg6WJgNDoM0UZGLVyXjS9ZyVJaHQqRtOYx4xRXukQGlTnBZ8IYWjxvRZfOCdqGRKakYXWpRRRW7bwKHreCbKLodY71DXJKe1F4+HCHOhyvy7i7vAhuhm6213m3F4o5tmw/VAnuMsPZIGrfkWshq+X5dZFJ7LiT1I7K+1EluM2IMoo/O4rErjJ+0yX5nfDoCwSnm38WJWysQaYX/wQiqV6tSodwP2fYiz5km3ReWdUtLAZOUMGfAw8qcCkVMv0+WiPqZnSC9JC3OLSVAwtfB3xJBX9E/PXha4GvE1pgg6S/NkXFSLK74E52AgfoJDJdOXuR+NsEC0xPIVYUtrmH+Ps4Hwez9nQ/4Xbg1kJv5aDe4xzm8lOB4BPE3201QvI1m5510Fh2HXW9SQ+w61JoOncIP48A5xd6JcI24BPqRoAnovJw+iReAc8DDxN/3yYNIONEzS6J2Y6lxP//BLuIvy/zGGrKLXyeEX+j1RbgbuAp4AoitqxgLuIH8CPwDRos3UL/U6TSvIcsoBD/BBgAutkVlEak9oYAAAAASUVORK5CYII=)
          no-repeat center center;
        background-size: 100%;
      }
    }

    &_img {
      width: 100%;
      height: 0;
      margin-top: 0.3rem;
      padding-top: calc(36 / 360 * 100%);
      background: url(https://img.youpin.mi-img.com/editor1/ce497b9d0341ac785d77e343dddab7e7.png?w=1080&h=111)
        no-repeat center center;
      background-size: 110% 120%;
    }

    &-check {
      width: 100%;

      > div {
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0.5rem 0.3rem;
        box-sizing: border-box;
      }

      &_num,
      &_server {
        display: flex;
        align-items: center;
        position: relative;

        span {
          font-size: 13px;
          color: #666666;
          display: inline-block;
          height: 1.5rem;
          line-height: 1.5rem;
          margin-right: 0.8rem;
        }

        .title {
          color: #999999;
          font-size: 12px;
          padding: 0;
          background: none;
        }

        > .num {
          font-weight: bold;
          font-size: 13px;
          color: #333333;
        }

        .to-detail {
          position: absolute;
          right: 0;
          top: 0;
          width: 0.8rem;
          height: 100%;
          padding-left: 0;
          background: url(https://m.youpin.mi.com/youpin/static/m/res/images/device_shop_right_arrow.png)
            no-repeat center center;
          background-size: 100%;
          align-self: strech;
        }
      }

      &_server {
        span {
          background: url(https://m.youpin.mi.com/youpin/static/m/res/images/detail_icon_service_v2.png)
            no-repeat center left;
          padding-left: 1rem;
          background-size: 0.8rem 0.8rem;
        }
      }
    }
  }

  article {
    .title {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #333333;
      margin-top: 0.5rem;
    }

    > img {
      width: 100%;
    }
  }

  .mint-popup-bottom {
    width: 100%;
    height: 25rem;
  }

  .yp-detail-buynumbox {
    padding: 1rem .8rem;
    box-sizing: border-box;

    &-header {
      width: 100%;
      height: 10rem;
      display: flex;
      align-items: center;

      &_img{
        width: 8rem;
        height: 0;
        padding-top: 8rem;
        position: relative;
        margin-right: 1rem;

        > img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }

      &_price {
        > .price {
          font-size: 1.6rem;
          font-weight: bold;
          color: #b60909;
          margin-bottom: .8rem;

          i{
            font-size: 1rem;
          }
        }

      > .count {
        font-size: 12px;
        color: #666666;
      }
      }
    }

  &_addNum {
      p {
        font-size: 12px;
        color: #666666;
        margin-bottom: .8rem;
        margin-bottom: .8rem;
      }

      span {
        display: inline-block;
        width: 1rem;
        height: 2rem;
        line-height: 2rem;
        border: 1px solid #dedede;
        font-weight: bold;
        text-align: center;
      }

      > .decreaseCount {
        margin-left: 1rem;
      }

      > .count {
        width: auto;
        padding: 0 2rem;
        border-width: 1px 0 1px 0;
      }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0.5rem;
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    div {
      width: 48%;
      text-align: center;
      height: 2rem;
      line-height: 2rem;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
    }

    &_buyNow {
      background: #d1a96e;
      border-radius: 0 20rem 20rem 0;
    }

    &_addToCart {
      background: #b60909;
      border-radius: 20rem 0 0 20rem;
    }
  }

  }
}
img {
  vertical-align: top;
}

</style>

<style>
  .yp-toast{
    z-index: 9999;
  }
</style>
