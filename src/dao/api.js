const version = 1 // 默认版本1

const head = '/tppssp'
const head2 = '/vpa'
// const head2 = '/sli'
const ver = 'v1' // 默认版本1
const head3 = '/vpa/auth/'
const headStr6 = `${head3}${ver}`

const headStr = `${head}/v${version}`
const headStr2 = `${head2}/app/v${version}`
// const headStr3 = `/service-aisp-aiui`;
const headStr4 = `${head2}/v${version}/dfir`
const headStr5 = `${head2}/v${version}/cloudFunction`

const headConfig = `/vpa/baseConfig/v${version}`
const headStrConfigAqua = `${headConfig}/aqua`
const headStrConfigDfir = `${headConfig}/dfir`


// 用户权限
const user = {
  login: headStr2 + '/permission/appLogin', // 用户登录
  logOut: headStr2 + '/permission/appLogoutByUserId', // 退出登录
  getUserAuth: headStr6 + '/permission/loadUserFullyById', // 获取用户权限信息
  updateOwnPwd: headStr2 + '/permission/updateOwnPwd', // 修改密码
  findByOrgCode: headStr2 + '/permission/findByOrgCode', // 获取所有的车厂
  isAuthLogin: headStr2 + '/permission/isAuthLogin', // 用户是否可以登录
  isAuthUpdatePassword: headStr2 + '/permission/isAuthUpdatePassword', // 用户是否可以修改密码
  orgUsers: headStr2 + '/permission/getUsersUnderOrg', // 获取组织机构下的用户
  semantics: headStr2 + '/user/semanticPlatform' // 获取语义协议内容
}



const API = {
  user
}

export {
  user
}

export default API
