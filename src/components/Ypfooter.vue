<template>
  <ul class="footer">
    <router-link
      v-for="item in list"
      :key="item.name"
      :to="item.path"
      tag="li"
      :event="$route.path.includes(item.path) ? '' : 'click'"
    >
      <span class="icon" v-html="item.icon"></span>
      <span class="title">{{item.title}}</span>
    </router-link>
    <cart-total class="cart-total"/>
  </ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import YpCartTotal from './YpCartTotal'
export default {
  // component: cartTotal,
  components: {
    cartTotal: YpCartTotal
  },
  data () {
    return {
      list: [
        {
          title: '首页',
          path: '/home',
          name: 'home',
          icon: '&#xe626;'
        },
        {
          title: '分类',
          path: '/Mall',
          name: 'mall',
          icon: '&#xe62f;'
        },
        {
          title: '购物车',
          path: '/cart',
          name: 'cart',
          icon: '&#xe64c;'
        },
        {
          title: '个人',
          path: '/mine',
          name: 'mine',
          icon: '&#xe615;'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'isDoubleClick'
    ]),
    ...mapGetters([
      'cartGoodsTotal'
    ])
  },
  created () {
    // console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 52px;
  border-top: 1px solid #dedede;
  display: flex;
  position: relative;

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

    &.router-link-exact-active,
    &.router-link-active {
      color: #2979ff;
    }
  }

  > .cart-total {
    position: absolute;
    right: 30%;
    top: -.3rem;
  }
}
</style>
