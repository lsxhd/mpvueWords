import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
// import skill from './modules/skill'
// import qa from './modules/qa'
// import appListInfo from './modules/app/appList'
// import appManOperInfo from './modules/app/appOper'
// import authInfo from './modules/user/auth'
// import basicInfo from './modules/basic'

// import loadInfo from './modules/load/loading'

// import aquaBasicInfo from './modules/basic-info-config/aqua-basic-info'
// import pkBasicInfo from './modules/basic-info-config/pk-basic-info'
// import tokenBasicInfo from './modules/basic-info-config/token-basic-info'
// import basicConifgInfo from './modules/basic-info-config'
// import categoryBasicInfo from './modules/basic-info-config/category-basic-info'
// import appidBasicInfo from './modules/basic-info-config/appid-basic-info'
// import sceneBasicInfo from './modules/basic-info-config/scene-basic-info'
// import configBasicInfo from './modules/basic-info-config/config-basic-info'
// import ocpBasicInfo from './modules/basic-info-config/ocp-basic-info'
// import voiceBasicInfo from './modules/basic-info-config/voice-basic-info'
// import dfirVersionInfo from './modules/basic-info-config/dfir-version-info'
// import whiteBasicInfo from './modules/basic-info-config/white-basic-info'
// import nluBasicInfo from './modules/basic-info-config/nlu-basic-info'
// import nluConfigBasicInfo from './modules/basic-info-config/nlu-config-basic-info'
// import dFirProtInfo from './modules/basic-info-config/dfir-prot-info'

import USER from "@/dao/modules/user";

Vue.use(Vuex);

const STORAGE_KEY_USER_INFO = "userInfo";

export default new Vuex.Store({
  state: {
    userInfo: ""
  },
  mutations: {
    //登录操作
    login(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem(
        STORAGE_KEY_USER_INFO,
        JSON.stringify(state.userAuth)
      );
    },
    //退出登陆
    checkout() {
      localStorage.removeItem(STORAGE_KEY_USER_INFO);
    }
  },
  actions: {
    getUserInfo({ state, commit }) {
      // 获取用户权限信息
      return state.userInfo;
    }
  },
  modules: {
    user
    // skill,
    // qa,
    // appListInfo,
    // appManOperInfo,
    // authInfo,
    // basicInfo,
    // loadInfo,
    // aquaBasicInfo,
    // pkBasicInfo,
    // tokenBasicInfo,
    // basicConifgInfo,
    // categoryBasicInfo,
    // appidBasicInfo,
    // sceneBasicInfo,
    // configBasicInfo,
    // ocpBasicInfo,
    // voiceBasicInfo,
    // dfirVersionInfo,
    // whiteBasicInfo,
    // nluBasicInfo,
    // nluConfigBasicInfo,
    // dFirProtInfo
  },
  getters: {
    getUserOpenId(state) {
      return state.userInfo.openId;
    },
    getUserId(state) {
      return state.userInfo.userId;
    },
    getUserName(state) {
      return state.userInfo.userName;
    },
    getAuthorization(state) {
      return state.Authorization;
    }
  }
});
