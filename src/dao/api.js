const version = 1 // 默认版本1

const headUser = 'mvc/user'


// 用户权限
const user = {
  login: headUser + '/login', // 用户登录
  logOut: headUser + '/permission/appLogoutByUserId', // 退出登录
}



const API = {
  user
}

export {
  user
}

export default API
