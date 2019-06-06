import BackTop from './BackTop'

// 让BackTop成为一个Vue插件, 直接在BackTop上写一个install，这个方法有两个参数，第一个Vue本身，实际上就是全局的Vue, 第二个参数是一个可选的选项对象
BackTop.install = (Vue) => {
  // 注册BackTop为全局组件
  Vue.component('BackTop', BackTop)
}
// 并且把BackTop导出， 在其它地方引入这里的BackTop就可以直接使用Vue.use(BackTop)来使用这个插件了
export {
  BackTop
}
