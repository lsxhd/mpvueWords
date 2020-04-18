import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import skill from './modules/skill'
import qa from './modules/qa'
import appListInfo from './modules/app/appList'
import appManOperInfo from './modules/app/appOper'
import authInfo from './modules/user/auth'
import basicInfo from './modules/basic'

import loadInfo from './modules/load/loading'

import aquaBasicInfo from './modules/basic-info-config/aqua-basic-info'
import pkBasicInfo from './modules/basic-info-config/pk-basic-info'
import tokenBasicInfo from './modules/basic-info-config/token-basic-info'
import basicConifgInfo from './modules/basic-info-config'
import categoryBasicInfo from './modules/basic-info-config/category-basic-info'
import appidBasicInfo from './modules/basic-info-config/appid-basic-info'
import sceneBasicInfo from './modules/basic-info-config/scene-basic-info'
import configBasicInfo from './modules/basic-info-config/config-basic-info'
import ocpBasicInfo from './modules/basic-info-config/ocp-basic-info'
import voiceBasicInfo from './modules/basic-info-config/voice-basic-info'
import dfirVersionInfo from './modules/basic-info-config/dfir-version-info'
import whiteBasicInfo from './modules/basic-info-config/white-basic-info'
import nluBasicInfo from './modules/basic-info-config/nlu-basic-info'
import nluConfigBasicInfo from './modules/basic-info-config/nlu-config-basic-info'
import dFirProtInfo from './modules/basic-info-config/dfir-prot-info'

import USER from '@/dao/modules/user'

Vue.use(Vuex)

const STORAGE_KEY_USER_AUTH = 'userAuth'
const STORAGE_KEY_COMMON_PARAMS = 'commonParams'
const STORAGE_KEY_USER_FULL = 'userFull'

export default new Vuex.Store({
  state: {
    userAuth: JSON.parse(localStorage.getItem(STORAGE_KEY_USER_AUTH)) || {},
    commonParams: JSON.parse(localStorage.getItem(STORAGE_KEY_COMMON_PARAMS)) || {
      // 登录获取的公共参数
      IATOKEN: '',
      userId: '',
      jtoken: '',
      env: ''
    },
    userFull: JSON.parse(localStorage.getItem(STORAGE_KEY_USER_FULL)) || {
      auth: '',
      fully: {
        user: {
          org: {},
          role: []
        },
        resourceAuths: []
      }
    },
  },
  mutations: {
    //登录操作
    login(state, userObj) {
      state.userAuth = userObj
      localStorage.setItem(STORAGE_KEY_USER_AUTH, JSON.stringify(state.userAuth))
    },
    //退出登陆
    checkout() {
      localStorage.removeItem(STORAGE_KEY_USER_AUTH)
      localStorage.removeItem(STORAGE_KEY_COMMON_PARAMS)
      localStorage.removeItem(STORAGE_KEY_USER_FULL)
    },
    setCommonParams(state, params) {
      state.commonParams = Object.assign({}, state.commonParams, params)
      localStorage.setItem(
        STORAGE_KEY_COMMON_PARAMS,
        JSON.stringify(state.commonParams)
      )
    },
    setUserFull(state, data) {
      state.userFull = data
      localStorage.setItem(
        STORAGE_KEY_USER_FULL,
        JSON.stringify(data)
      )
    }
  },
  actions: {
    getUserAuths({ state, commit }) {
      // 获取用户权限信息
      let params = new URLSearchParams()
      let cur = state.userAuth.account
      if (cur && cur !== '') {
        params.append('accountName', cur)
        params.append('contextPath', '/sli')

        USER.getUserAuth(params)
          .then(res => {
            let authMenuList =
              Object.assign({}, res.data.data.fully.resourceAuths) || {}
            commit('authInfo/setMenuList', authMenuList)
            let dingzhiAuth = false
            let skillAuth = authMenuList['/opertionManMain/opertionList']
            if (skillAuth) {
              if (skillAuth.optAction.length > 0) {
                if (skillAuth.optAction.indexOf('dingzhi') >= 0) {
                  dingzhiAuth = true
                }
              }
            }
            commit('authInfo/setDingzhiAuth', dingzhiAuth)

            let auth = res.data.data.auth
            commit('authInfo/setAuth', auth)

            let companyId = res.data.data.fully.user.org.orgCode
            let companyName = res.data.data.fully.user.org.name
            commit('authInfo/setCompanyId', companyId)
            commit('authInfo/setCompanyName', companyName)

            /**
             *  public static final String SYSADMINROLEENGLISHNAME = "sysadmin"; // 索引显示
             *  public static final String ADMINROLEENGLISHNAME = "admin"; // 索引显示
             *  public static final String INSIDEROLEENGLISHNAME = "inside"; // 索引显示
             *  public static final String CUSTOMERROLEENGLISHNAME = "customer"; // 索引显示
             */

            let role = res.data.data.fully.user.role
            /**
                     * autoAdmin;// 车载管理员
                        carAdmin;// 车厂管理员
                        projectAdmin;// 项目管理员
                        resourceAudit; // 资源部审核管理员
                     */
            let isClients = role.find(ele => {
              return ele.englishName == 'aiPlusClients' // 车厂客户-用户
            })

            let admin = role.find(ele => {
              return ele.englishName == 'resourceAudit' // 资源部审核管理员
            })

            commit('authInfo/setClients', typeof isClients != 'undefined')
            commit('authInfo/setIsAdmin', typeof admin != 'undefined')

            commit('authInfo/setEngName', auth)
            commit('authInfo/setAuthName', auth)
            commit('authInfo/setRoleList', role)
            commit('setUserFull', res.data.data)
          })
          .catch(err => { })
      }
    }
  },
  modules: {
    common,
    skill,
    qa,
    appListInfo,
    appManOperInfo,
    authInfo,
    basicInfo,

    loadInfo,

    aquaBasicInfo,
    pkBasicInfo,
    tokenBasicInfo,
    basicConifgInfo,
    categoryBasicInfo,
    appidBasicInfo,
    sceneBasicInfo,
    configBasicInfo,
    ocpBasicInfo,
    voiceBasicInfo,
    dfirVersionInfo,
    whiteBasicInfo,
    nluBasicInfo,
    nluConfigBasicInfo,
    dFirProtInfo
  },
  getters: {
    getUserAccount(state) {
      const account = state.userAuth.account
      if (account == null || account == undefined || account == '') {
        return ''
      } else {
        var pat = /(\d{3})\d*(\d{4})/
        return state.userAuth.account.replace(pat, '$1****$2')
      }
    },
    userId(state) {
      return state.userAuth.userId
    },
    companyId(state) {
      return state.userFull.fully.user.org.orgCode
    }
  }
})
