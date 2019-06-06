export default {
  isShowBackToTop: false,
  isDoubleClick: false,
  cartGoodsInfo: JSON.parse(window.localStorage.getItem('yp-cart')) || [],
  totalGoods: 0,
  initialCount: 1,
  isLogin: false,
  username: '未登录',
  messageCorde: ''
}
