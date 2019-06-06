<template>
    <div class="yp-myOrder-contenner">
        <mt-header title="我的订单">
            <router-link to="/Mine" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <mt-navbar>
            <mt-tab-item id="1" class="yp-myOrder-list">全部订单</mt-tab-item>
            <mt-tab-item id="2" class="yp-myOrder-list">待付款</mt-tab-item>
            <mt-tab-item id="3" class="yp-myOrder-list">待收款</mt-tab-item>
            <mt-tab-item id="1" class="yp-myOrder-list">待收货</mt-tab-item>
            <mt-tab-item id="2" class="yp-myOrder-list">已收货</mt-tab-item>
        </mt-navbar>
    </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // 导航守卫，判断是否需要验证；
    if (to.meta.isAuthRequired === true) {
      // 判断是否已经登录，若已登录，直接到目标页面，若没有登录，则跳转到登录页面；
      if (localStorage.getItem('isLoginStatus')) {
        next()
      } else {
        next('/Login')
      }
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.yp-myOrder{
  &-list{
    &.router-link-exact-active,
    &.router-link-active {
      color: #2979ff;
    }
  }

}
</style>
