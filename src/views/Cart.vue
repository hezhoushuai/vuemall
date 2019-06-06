<template>
<div class="yp-cart">
  <div class="yp-cart-header">
    <mt-header class="yp-cart-header_title" title="购物车">
      <span @click="goBack" to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
  </div>
  <div class="isEmpty" v-show="cartIsEmpty">购物车空空如也</div>
  <div class="yp-cart-main" v-if="!cartIsEmpty">
      <div class="yp-cart-main-goods">
        <p class="allcheck">
          <label>全选: <input
            type="checkbox"
            :checked="isAllChecked"
            @change="toggleCartAllChecked"
          ><span style="position: absolute;"></span></label>
        </p>
        <div
          class="yp-cart-main-goods_info"
          v-for=" item in cartGoodsInfo"
          :key="item.id"
        >
          <div class="delete-goods" @click="cartDeleteGoods(item.id)">X</div>
          <label><input
            type="checkbox"
            :checked="item.isChecked"
            @change="toggleIsChecked(item.id)"
          ><span></span></label>
          <div class="img-wraper"><img :src="item.imgUrl"></div>
          <div class="goods-info">
            <p>{{item.title}}</p>
            <p class="info">
              <span class="price">￥ {{item.price | toFixed2(item.price)}}</span>
              <span class="goods-num">
                <i
                  @click="changeCartGoodsCount({isAdd: false, id:`${item.id}`})"
                  class="decrease"
                >-</i>
                <i class="num">{{item.count}}</i>
                <i
                  @click="changeCartGoodsCount({isAdd: true, id: `${item.id}`})"
                  class="decrease"
                >+</i>
              </span>
            </p>
          </div>
        </div>
      </div>
  </div>

    <div class="yp-cart-footer" v-if="!cartIsEmpty">
      <div class="yp-cart-footer_count">
        <span class="allCount">共计：{{checkedcount}}件</span>
        <span class="money">合计：<i>{{computedTotalPrice | toFixed2(computedTotalPrice)}}</i></span>
      </div>
      <div class="yp-cart-footer_accounts"> 结算</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      emptCart: false
    }
  },
  methods: {
    ...mapMutations([
      'changeCartGoodsCount',
      'toggleIsChecked',
      'toggleCartAllChecked',
      'cartDeleteGoods'
    ]),
    goBack () {
      this.$router.back()
    }
  },
  computed: {
    ...mapState([
      'cartGoodsInfo',
      'totalGoods',
      'cartAllChecked'
    ]),
    ...mapGetters([
      'isAllChecked',
      'checkedcount',
      'computedTotalPrice',
      'cartIsEmpty'
    ])
  }
}
</script>

<style lang="scss" scoped>
html,body{
  font-size: 32px;
}

.yp-cart {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .isEmpty {
    position: absolute;
    width: 12rem;
    height: 12rem;
    line-height: 23rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    background: url(https://app.xiaomiyoupin.com/youpin/static/m/res/images/cart_empty.png) no-repeat center center;
    background-size: 50%;
    font-size: 12px;
    color: #787878;
  }

  &-header {
    position: sticky;
    top: 0;

    .mint-header {
      color: black;
      background: #fff;
      height: 47px;
      border-bottom: 2px solid #bfbfc0;

    }
  }

  &-main {
    flex: 1;
    overflow-x: hidden;
    padding: 0 1rem;
    box-sizing: border-box;
    background: #dca752;
    border-radius: 10px;
    margin-top: -9px;
    position: sticky;
    top: 2.3rem;

    .allcheck {
      font-size: 12px;
      height: 1rem;
      line-height: 1rem;
      margin-top: .3rem;

      .desc {
        margin: 0 .3rem;
        float: right;
      }

    }
    &-goods {
      width: 100%;

    &_info {
      width: 100%;
      height: 6rem;
      background-color: #bfbfc0;
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 1rem;
      margin: 1rem 0;
      box-sizing: border-box;
      position: relative;

      > .delete-goods{
        position: absolute;
        top: 0;
        right: 0;
        height: 1.5rem;
        width: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        font-weight: bold;
        color: #ffffff;
        background: #df5000;
        border-radius: 5px;
      }

      > .goods-info{

        p {
        width: 11.2rem;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 1rem 0;
        }

        .info {
          display: flex;
          justify-content: space-between;

          > .price {
            color: #BF1111;
            font-size: 14px;
          }

          > .goods-num {
            font-size: 15px;
            font-weight: bold;
            > .num{
              width: auto;
              padding: 0 1rem;
            }
          }
        }
      }

      > .img-wraper {
        width: 3rem;
        height: 0;
        padding-top: 3rem;
        position: relative;
        margin: 0 2rem;
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          max-width: 100%;
        }
      }
    }
    }
  }

  &-footer {
    height: 3rem;
    display: flex;
    align-items: center;
    background: #dedede;
    padding: 0 1rem;

    &_count {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 1rem;
      font-size: 13px;

      i {
        font-size: 17px;
        color: #BF1111;
      }
    }

    &_accounts {
    height: 2rem;
    line-height: 2rem;
    color: #fff;
    font-weight: bold;
    background: #BF1111;
    border-radius: 2rem;
    padding: 0 1rem;

    }
  }
}

label {
  > input {
    display: none;
  }
  > input:checked + span::before {
    opacity: 1;
  }

  > input:checked + span::after {
    opacity: 1;
  }

  > span {
    background: #fff;
    border: 1px solid #eee;
    position: relative;
    height: 1rem;
    border-radius: 2px;
    display: inline-block;
    background-color: #ffffff;
    width: 1rem;

    &::before {
      content: "";
      opacity: 0;
      position: absolute;
      height: 1rem;
      width: 1rem;
      top: 0;
      left: 0;
      background: #0066FF;
      border-radius: 2px;
    }
    &::after {
      content: "";
      opacity: 0;
      position: absolute;
      width: .3rem;
      height: .6rem;
      border: 2px solid #ffffff;
      left: 4px;
      top: 1px;
      border-width: 2px 0 0 2px;
      transform: rotateZ(-135deg)
    }
  }
}
.pay-now {
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  width: 4rem;
  float: right;
  background: #BF1111;
  color:#fff;
  font-weight: bold;
  border-radius: 5px;
  letter-spacing: 2px;

}
</style>
