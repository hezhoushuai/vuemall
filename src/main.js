import Vue from 'vue'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './router/index'
import * as $http from './requests/index'
import store from './store/index'

// 引入BackTop插件
import { BackTop } from '@/components'
// 使用BackTop插件
Vue.use(BackTop)

// 全局的混合
Vue.mixin({
  filters: {
    toFixed2 (num) {
      if (num !== undefined) {
        num -= 0
        return num.toFixed(2)
      }
    }
  }
})
// 解决点击两次bug
router.beforeEach((to, from, next) => {
  store.commit('getDoubleClickState', from.path.includes(to.path))
  next()
})

Vue.prototype.$http = $http
Vue.use(MintUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
