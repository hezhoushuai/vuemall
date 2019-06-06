<template>
  <div class="yp-Catefory-goods">
    <div class="yp-Catefory-goods-header">
      <div class="wraper">
        <img @click="goBack" src="https://app.xiaomiyoupin.com/youpin/static/m/res/images/std_tittlebar_main_device_back_normal.png" alt="">
        <span>{{title}}</span>
      </div>
    </div>
    <div class="yp-Catefory-goods-main">
    <ul>
      <router-link tag="li"
      v-for="item in list"
      :key="item.id"
      class="yp-Catefory-goods-main_list"
      :to="`/detail/${item.id}`">
        <div class="img-wraper">
          <img :src="item.image">
        </div>
        <p class="goods-title">{{item.title}}</p>
        <p class="goods-price">￥ {{item.price | toFixed2(item.price)}}</p>
      </router-link>
    </ul>
    <mt-button size="large" type="primary" @click="loadMore">加载更多...</mt-button>
    </div>
    <back-top
      scroll-container=".yp-Catefory-goods-main"
      :distance-to-show="300"
    ></back-top>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      list: [],
      title: '',
      isEnd: false,
      nextIndex: 0
      // loading: false
    }
  },
  created () {
    const { title } = this.$route.query
    this.title = title
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    getData () {
      const { cateID } = this.$route.params
      const { keyvalue } = this.$route.query
      if (this.$route.params.cateID - 0 === -1) {
        this.$http.searchs(keyvalue)
          .then(resp => {
            this.list = resp.data.data.list
          })
      } else {
        this.$http.GoodsByCategory(cateID, this.nextIndex)
          .then(resp => {
            if (resp.data.code === 400) {
              // 不存在的分类
              this.$http.GoodsByCategoryOther(cateID, this.nextIndex)
                .then(resp => {
                  const { list, isEnd = false, nextIndex = 0 } = resp.data.data
                  this.list.push(...list)
                  this.isEnd = isEnd
                  this.nextIndex = nextIndex
                })
            } else {
              const { list, isEnd = false, nextIndex = 0 } = resp.data.data.items
              this.list.push(...list)
              this.isEnd = isEnd
              this.nextIndex = nextIndex
            }
          })
      }
    },
    loadMore () {
      this.getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData()
    })
  }
}
</script>

<style lang="scss" scoped>
  .yp-Catefory-goods {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 3rem;
    box-sizing: border-box;

    &-header {
      box-sizing: border-box;
      width: 100%;
      height: 0;
      padding-top: calc(45 / 411 * 100%);
      position: relative;

      > .wraper {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        > img {
          max-height: 100%;
          float: left;
        }

        > span {
          display: inline-block;
          width: calc(311 / 411 * 100%);
          padding-top: calc(12 / 311 * 100%);
          text-align: center;
          margin: auto;
          font-size: 16px;
        }
      }
    }

    &-main {
      height: 100%;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      padding:8px 16px;
      box-sizing: border-box;
      padding-bottom:28px;

      &_list:nth-child(even) {
        margin-left: 20px;
      }

      &_list {
        display: inline-block;
        width: 46%;
        margin-bottom: 12px;

        > .img-wraper {
          height: 0;
          width: 100%;
          padding-top: 100%;
          position: relative;
          margin-bottom: 4px;

          > img {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
          }
        }

        > .goods-title {
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #9F8052;
        }

        > .goods-price {
          font-style: 15px;
          line-height: 30px;
          color:#B60909;
        }
      }
    }
  }
</style>
