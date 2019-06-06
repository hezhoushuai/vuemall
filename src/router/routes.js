// import Footer from '@/components/Footer'
import Ypfooter from '@/components/Ypfooter'
// 按需加载
const Home = () => import('@/views/Home')
const Mall = () => import('@/views/Mall')
const Taste = () => import('@/views/Taste')
const Cart = () => import('@/views/Cart')
const Mine = () => import('@/views/Mine')
const Detail = () => import('@/views/Detail')
const Login = () => import('@/views/Login')
const PayFor = () => import('@/views/PayFor')
const ForgetPassword = () => import('@/views/ForgetPassword')
const RegisterNow = () => import('@/views/RegisterNow')
const GoodsByCategory = () => import('@/views/GoodsByCategory')
const productList = () => import('@/components/ProductList')
const VerificationCode = () => import('@/views/VerificationCode')

export default [{
  name: 'home',
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  components: {
    default: Home,
    footer: Ypfooter
  }
}, {
  path: '/mall',
  name: 'mall',
  components: {
    default: Mall,
    footer: Ypfooter
  },
  children: [{
    path: ':id',
    component: productList
  }]
}, {
  path: '/taste',
  name: 'taste',
  components: {
    default: Taste,
    footer: Ypfooter
  }
}, {
  path: '/mine',
  name: 'mine',
  components: {
    default: Mine,
    footer: Ypfooter
  }
}, {
  path: '/cart',
  name: 'cart',
  components: {
    default: Cart,
    footer: Ypfooter
  }
}, {
  path: '/GoodsByCategory/:cateID',
  name: 'GoodsByCategory',
  component: GoodsByCategory
}, {
  path: '/detail/:goodID',
  name: 'detail',
  component: Detail
}, {
  path: '/login',
  name: 'login',
  components: {
    default: Login
  }
}, {
  path: '/payFor',
  name: 'payFor',
  components: {
    default: PayFor,
    footer: Ypfooter
  },
  meta: {
    isAuthRequired: true
  }
}, {
  path: '/forgetPassword',
  name: 'forgetPassword',
  components: {
    default: ForgetPassword
  },
  meta: {
    isAuthRequired: false
  }
}, {
  path: '/registerNow',
  name: 'registerNow',
  components: {
    default: RegisterNow
  },
  meta: {
    isAuthRequired: false
  }
}, {
  path: '/verificationCode',
  name: 'verificationCode',
  components: {
    default: VerificationCode
  },
  meta: {
    isAuthRequired: false
  }
}
]
