<template>
  <div class="product-list">
    <div class="ad">
      <img
        src="https://img.youpin.mi-img.com/miio_album_pics/cbb5d30c7079a4964137f55471145d0f.jpg@base@tag=imgScale&F=webp"
      >
    </div>
    <router-link
      tag="div"
      class="products-list-detail"
      v-for="item in list"
      :key="item.id"
      :to="{ path: `/GoodsByCategory/${item.cateID}` , query: {title: item.title} }"
    >
      <h2>
        <img :src="item.imageUrl">
      </h2>
      <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'porductList',
  data () {
    return {
      list: []
    }
  },
  methods: {
    mallDetailData: function () {
      const { id } = this.$route.params
      this.$http.getMallDetail(id).then(resp => {
        this.list = resp.data.data.categories
        this.list.forEach((item, index) => {
          item.cateID = item.url.substr(item.url.length - 4, 4)
        })
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.mallDetailData()
    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.mallDetailData()
  }
}
</script>

<style lang="scss" scoped>
.product-list .ad {
  width: 100%;
  height: 0;
  padding-top: calc(108 / 215 * 100%);
  position: relative;

  > img {
    max-width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
}

.product-list .products-list-detail {
  display: inline-block;
  width: 33.3%;
  box-sizing: border-box;
  padding: 0 20px 12px 0;
  text-align: center;

  > span {
    line-height: 20px;
    font-size: 12px;
    color: #666666;
  }

  > h2 {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    > img {
      position: absolute;
      max-width: 100%;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
