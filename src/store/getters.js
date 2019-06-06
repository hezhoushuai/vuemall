export default {
  // 是否全部选中
  isAllChecked (state) {
    return state.cartGoodsInfo.every(item => item.isChecked === true)
  },
  // 计算选中商品数量
  checkedcount (state) {
    return state.cartGoodsInfo.reduce((total, current) => {
      return current.isChecked ? total + current.count : total
    }, 0)
  },
  // 计算选中商品总价
  computedTotalPrice (state) {
    return state.cartGoodsInfo.reduce((total, current) => {
      return current.isChecked ? total + current.price * current.count : total
    }, 0)
  },
  // 购物车判空
  cartIsEmpty (state) {
    return state.cartGoodsInfo.length === 0
  },
  // 计算购物车总量
  cartGoodsTotal (state) {
    return state.cartGoodsInfo.reduce((total, item) => {
      return total + item.count
    }, 0)
  }
}
