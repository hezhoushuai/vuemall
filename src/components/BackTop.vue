<template>
  <div
    class="yp-backtop"
    v-show="isShow"
    v-back-top="{
      scrollContainer,
      toggleShow
      }"
    @click="scrollToTop">
    TOP
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return { isShow: false }
  },
  props: {
    scrollContainer: String,
    distanceToShow: Number
  },
  methods: {
    scrollToTop () {
      document.querySelector(this.scrollContainer).scrollTop = 0
    },
    // 这个方法会传入到指令里去执行
    toggleShow (isShow) {
      this.isShow = isShow
    }
  },
  // 这里是局部注册自定义指令
  directives: {
    'back-top': {
      // 当元素插入的时候执行的一个方法
      inserted (el, binding) {
        // 所有指令传入的参数都在bindging.value上
        document.querySelector(binding.value.scrollContainer).addEventListener('scroll', (e) => {
          if (e.target.scrollTop > 300) {
          // 在指令里没有this，如果要修改某个组件内的data, 就需要把组件内的一个方法传入到指令的value里，在这里调用
            binding.value.toggleShow(true)
          } else {
            binding.value.toggleShow(false)
          }
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .yp-backtop {
    background: red;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-weight: 600;
    font-size: .5rem;
    text-align: center;
    position: fixed;
    border-radius: 50%;
    color: white;
    background: #26a2ff;
    bottom: 4rem;
    right: 1rem;
  }

</style>
