// 权限模块 状态管理
import USER from '@/dao/modules/user'
import { paramsAppend, getFilterList } from '@/utils/common'

const authInfo = {
  namespaced: true,
  state: {
    authInfo: {
      account: sessionStorage.getItem('account'), // 用户账户
      companyId: sessionStorage.getItem('companyId'), // 车厂ID
      engName: sessionStorage.getItem('engName'), // 用户英文名
      companyName: sessionStorage.getItem('companyName'), // 车厂name
      user: false, // 普通用户
      auth: sessionStorage.getItem('auth') || {}, // 用户角色
      authName: sessionStorage.getItem('authName') || {}, // 用户角色名称 管理员、车厂管理员、项目管理员
      admin: false, // 管理员
      menuList: {}, // 菜单权限
      roleList: JSON.parse(sessionStorage.getItem('roleList')), // 用户角色
      isClients: sessionStorage.getItem('isClients') || false, // 车厂客户
      dingzhiAuth: false
    },
    company: {
      params: {
        orgCode: ''
      },
      list: [],
      filterList: []
    }
  },
  getters: {},
  mutations: {
    setDingzhiAuth(state, is = false) {
      // 设置是否为可定制用户
      state.authInfo.dingzhiAuth = is
    },
    setClients(state, is) {
      // 设置是否为车厂客户
      sessionStorage.setItem('isClients', is)
      state.authInfo.isClients = is
    },
    setAccount(state, name) {
      sessionStorage.setItem('account', name)
      state.authInfo.account = name
    },
    setAuth(state, auth) {
      sessionStorage.setItem('auth', auth)
      state.authInfo.auth = auth
    },
    setCompanyId(state, id) {
      // 车厂ID
      sessionStorage.setItem('companyId', id)
      state.authInfo.companyId = id
    },
    setIsAdmin(state, is) {
      // 是否为管理员
      state.authInfo.admin = is
      state.authInfo.user = !is
    },
    setMenuList(state, list) {
      // 设置菜单权限
      state.authInfo.menuList = list
    },
    setEngName(state, name) {
      sessionStorage.setItem('engName', name)
      state.authInfo.engName = name
    },
    setAuthName(state, name) {
      sessionStorage.setItem('authName', name)
      state.authInfo.authName = name
    },
    setRoleList(state, list = []) {
      sessionStorage.setItem('roleList', JSON.stringify(list))
      state.authInfo.roleList = list
    },
    setCompanyName(state, name) {
      sessionStorage.setItem('companyName', name)
      state.authInfo.companyName = name
    }
  },
  actions: {
    getAllCompany({ state }) {
      // 获取所有车厂
      let param = Object.assign({}, state.company.params, {
        orgCode: state.authInfo.companyId
      })
      let params = paramsAppend(param)
      USER.findByOrgCode(params)
        .then(res => {
          state.company.list = res.data.data.organizations || []
          state.company.filterList = getFilterList(
            res.data.data.organizations,
            ['name', 'name']
          )
        })
        .catch(err => {
          state.company.list = []
          state.company.filterList = []
        })
    }
  }
}

export default authInfo
