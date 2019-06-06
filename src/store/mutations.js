export default {
  isShowBackToTop (state, isShow = false) {
    state.isShowBackToTop = isShow
  },
  getDoubleClickState (state, doubleClick = false) {
    state.isDoubleClick = doubleClick
  },
  // 添加到购物车
  addGoodsToCart (state, goodsInfo) {
    const isInCart = state.cartGoodsInfo.some(item => item.id === goodsInfo.id)
    if (isInCart) {
      state.cartGoodsInfo = state.cartGoodsInfo.map(item => {
        if (item.id === goodsInfo.id) {
          item.count += goodsInfo.count
        }
        return item
      })
    } else {
      state.cartGoodsInfo.push({
        ...goodsInfo,
        isChecked: false
      })
    }
  },
  changeInitialCount (state, isAdd) {
    isAdd ? state.initialCount++ : state.initialCount--
  },
  // 改变右侧计数
  changeCartGoodsCount (state, { isAdd, id }) {
    id -= 0
    if (isAdd === true) {
      state.cartGoodsInfo = state.cartGoodsInfo.map(item => {
        if (item.id === id) {
          item.count++
        }
        return item
      })
    } else {
      state.cartGoodsInfo = state.cartGoodsInfo.map(item => {
        if (item.id === id) {
          if (--item.count < 0) {
            item.count = 0
          }
        }
        return item
      })
    }
  },
  // 单选框功能
  toggleIsChecked (state, goodsId) {
    state.cartGoodsInfo = state.cartGoodsInfo.map(item => {
      if (item.id === goodsId) {
        item.isChecked = !item.isChecked
      }
      return item
    })
  },
  // 全选框功能
  toggleCartAllChecked (state) {
    state.cartAllChecked = !state.cartAllChecked
    if (state.cartGoodsInfo.every(item => item.isChecked === true)) {
      state.cartGoodsInfo = state.cartGoodsInfo.map(current => {
        current.isChecked = false
        return current
      })
    } else {
      state.cartGoodsInfo = state.cartGoodsInfo.map(current => {
        current.isChecked = true
        return current
      })
    }
  },
  // 删除购物车商品功能
  cartDeleteGoods (state, id) {
    console.log(id)
    state.cartGoodsInfo = state.cartGoodsInfo.filter(item => item.id !== id)
  },
  // 修改验证码
  changeMessageCard (state, res) {
    state.messageCorde = res[0].securityCode
    // console.log(state.messageCorde)
  },
  // 清空验证码
  clearCode (state) {
    state.messageCorde = ''
  },
  // 修改登录登录状态
  changeLoginStatus (state, status) {
    if (status) {
    } else {
      state.isLogin = false
    }
  }
}
