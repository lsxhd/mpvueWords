import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import plan from "./modules/plan";

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
    user,
    plan
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
