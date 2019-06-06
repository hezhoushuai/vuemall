import axios from 'axios'
import { Indicator } from 'mint-ui'

const ajax = axios.create()
// ajax拦截器
ajax.interceptors.request.use(config => {
  // mintui加载中
  Indicator.open({
    text: '数据加载中...',
    spinnerType: 'fading-circle'
  })
  return config
})

// 数据响应时拦截
ajax.interceptors.response.use(resp => {
  // 关闭loading
  Indicator.close()
  if (resp.status === 200) {
    return resp
  } else {
    // TODO:数据请求不成功错误处理
  }
})

// 获取首页数据
export const getHomeData = () => {
  return ajax.get('/api/tab/1')
}

// 轮播图数据请求
export const getimg = () => {
  return ajax.get('api/tab/1?start=0')
}

// 导航请求
export const detNavdata = () => {
  return ajax.get('/api/tab/2?start=0')
}

// home新品数据请求
export const getnewPro = () => {
  return ajax.get('/api/tab/3?start=0')
}

// search页面请求
export const searchs = (keys) => {
  return ajax.get(`http://www.xiongmaoyouxuan.com/api/search?word=${keys}&start=0&sort=0&couponOnly=NaN&minPrice=0&maxPrice=99999`)
}

// 获取列表页列表数据
export const getMallData = () => {
  return ajax.get('/api/tabs?sa=')
}

// 获取列表页详情数据
export const getMallDetail = (id, start = 0) => {
  return ajax.get(`/api/tab/${id}?start=${start}`)
}

// 获取该分类下的所有商品信息
export const GoodsByCategory = (id, start = 0) => {
  return ajax.get(`/api/category/${id}/items?start=${start}&sort=0`)
}
// 获取code=400的数据，上面的接口获取不到的数据
export const GoodsByCategoryOther = (id, start = 0) => {
  return ajax.get(`/api/column/${id}/items?start=${start}`)
}

// 获取产品详情数据
export const getDetail = (id) => {
  return ajax.get(`/api/detail?id=${id}&normal=1&sa=`)
}

// 搜索框数据
export const searchData = (keyword) => {
  return ajax.get(`/api/search?word=${keyword}&start=0&sort=0&couponOnly=0&minPrice=0&maxPrice=99999`)
}

// 获取短信验证码
export const getPhoneImagine = () => {
  return ajax.get(`http://rap2api.taobao.org/app/mock/167788/phoneImagine?id=`)
}

// 登录请求
export const login = ({ phoneNumber, phoneImagine }) => {
  return ajax.get(`http://rap2api.taobao.org/app/mock/167788/regustAddLogin?phone=${phoneNumber}&securityCode=${phoneImagine}`)
}
