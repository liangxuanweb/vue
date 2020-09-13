import router from './index'
import { getToken, removeToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/Login']

//路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/Login') {
      removeToken() //删除ToKen
      next()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/Login')
    }
  }
})
