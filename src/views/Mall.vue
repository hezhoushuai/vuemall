<template>
  <div class="yp-mall">
    <div class="yp-mall-header">
      <form class="yp-mall-header_search">
        <i class="icon"></i>
        <input type="text" placeholder="有品心动卡" @input="showSearch">
        <ul class="search-list">
          <router-link
            :to="item.id === -1 ?  '' : `/detail/${item.id}`"
            tag="li"
            v-for="item in searchList"
            :key="item.id"
          >{{item.title}}</router-link>
        </ul>
        <div
          class="clear-search-box"
          @click="clearSearchBox"
          v-if="isShowClearButton"
        >X</div>
      </form>
    </div>
    <div class="yp-mall-wrap">
      <ul class="yp-mall-wrap_list">
        <router-link
          tag="li"
          v-for=" item in list"
          :key="item.id"
          :to="`/Mall/${item.id}`"
        >{{item.name}}</router-link>
      </ul>
      <div class="yp-mall-wrap_products">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mall',
  data () {
    return {
      list: [],
      searchList: [],
      isShowClearButton: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData()
    })
  },
  methods: {
    getData: function () {
      this.$http.getMallData()
        .then(resp => {
          const { list = [] } = resp.data.data
          this.list = list
          this.list.shift()
          this.updateID()
        })
    },
    updateID () {
      // 处理默认的跳转，如果路由有带ID，就使用路由的ID, 如果没有，就跳到第一项
      const { id = this.list[0].id } = this.$route.params
      this.$router.push(`/Mall/${id}`)
    },
    showSearch (e) {
      // 得到搜索数据,渲染搜索列表
      this.isShowClearButton = e.target.value.length !== 0
      this.$http.searchData(e.target.value)
        .then(resp => {
          this.searchList = resp.data.data.list.length === 0 ? [{
            title: resp.data.data.emptyMsg,
            id: -1
          }] : resp.data.data.list.filter((item, index) => index <= 10)
        })
    },
    clearSearchBox (e) {
      // 清除输入框按钮
      e.path[1].children[1].value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.yp-mall {
  display: flex;
  flex-direction: column;
  height: 100%;

  &-header {
    padding: 8px 12px;

    &_search {
      position: relative;
      display: flex;
      background-color: #eee;
      width: 100%;
      height: 28px;
      line-height: 28px;
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
        // color: rgb(204, 204, 204);
        outline: none;
      }

      .search-list {
        position: absolute;
        background-color: #fff;
        font-size: 12px;
        color: #333333;
        top: 1.7rem;
        z-index: 999;
        width: 100%;
        border-radius: 0 0 5px 5px;
        border: 1px solid #d1d5da;
        box-sizing: border-box;
        border-width: 1px 1px 0 1px;

        > li {
          padding:0 1rem;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
          border-bottom: 1px solid #d1d5da;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .clear-search-box {
        width: 1rem;
        text-align: center;
        font-size: 12px;
        color: #2979FF;
      }
    }
  }

  &-wrap {
    display: flex;
    flex: 1;
    height: 100%;
    overflow: hidden;

    &_list {
      width: 24%;
      height: 100%;
      font-size: 12px;
      padding-top: 12px;
      box-sizing: border-box;
      border-top: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      overflow-x: hidden;

      > li {
        color: #333;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }

      > .router-link-exact-active {
        position: relative;
        color: rgb(132, 95, 63);
        font-size: 13px;

        &::before {
          content: "";
          position: absolute;
          height: 20px;
          width: 3px;
          background: rgb(132, 95, 63);
          left: 0;
          top: 10px;
        }
      }
    }

    &_products {
      flex: 1;
      box-sizing: border-box;
      padding: 12px 12px;
      border-top: 1px solid #e5e5e5;
      overflow-x: hidden;
    }
  }
}
</style>
