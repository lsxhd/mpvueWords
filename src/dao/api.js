const version = 1 // 默认版本1

const headUser = 'mvc/user'


// 用户权限
const user = {
  login: headUser + '/login', // 用户登录
  logOut: headUser + '/permission/appLogoutByUserId', // 退出登录
  getUserAuth: headUser + '/permission/loadUserFullyById', // 获取用户权限信息
  updateOwnPwd: headUser + '/permission/updateOwnPwd', // 修改密码
  findByOrgCode: headUser + '/permission/findByOrgCode', // 获取所有的车厂
  isAuthLogin: headUser + '/permission/isAuthLogin', // 用户是否可以登录
  isAuthUpdatePassword: headUser + '/permission/isAuthUpdatePassword', // 用户是否可以修改密码
  orgUsers: headUser + '/permission/getUsersUnderOrg', // 获取组织机构下的用户
  semantics: headUser + '/user/semanticPlatform' // 获取语义协议内容
}



const API = {
  user
}

export {
  user
}

export default API
