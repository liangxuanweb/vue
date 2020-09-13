import instance from '@/utils/request'
/**
 * 获取验证码
 */
export function GetSms(data) {
  return instance.request({
    method: 'POST',
    url: '/getSms/',
    data,
  })
}

/**
 * 注册
 */
export function Register(data) {
  return instance.request({
    method: 'POST',
    url: '/register/',
    data,
  })
}
/**
 * 登录
 */
export function Login(data) {
  return instance.request({
    method: 'POST',
    url: '/login/',
    data,
  })
}
