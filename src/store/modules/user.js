const STORAGE_KEY_USER_INFO = "userInfo";
const STORAGE_KEY_USER_TOKEN = "token";
const user = {
  namespaced: true,
  state: {
    isLogin: Boolean(wx.getStorageSync(STORAGE_KEY_USER_INFO)),
    userInfo: wx.getStorageSync(STORAGE_KEY_USER_INFO)
      ? JSON.parse(wx.getStorageSync(STORAGE_KEY_USER_INFO))
      : {
          token: "",
          userId: "",
          userName: "",
          openId: ""
        }
  },
  mutations: {
    //登录操作
    loginEnd(state, userInfo) {
      console.log("登录", userInfo, JSON.stringify(userInfo));
      state.userInfo = userInfo;
      wx.setStorageSync(
        STORAGE_KEY_USER_TOKEN,
        JSON.stringify(state.userInfo.token)
      );
      wx.setStorageSync(STORAGE_KEY_USER_INFO, JSON.stringify(state.userInfo));
      state.isLogin = true;
    },
    //退出登陆
    checkoutEnd(state) {
      wx.removeStorageSync(STORAGE_KEY_USER_TOKEN);
      wx.removeStorageSync(STORAGE_KEY_USER_INFO);
      state.userInfo = wx.getStorageSync(STORAGE_KEY_USER_INFO)
        ? JSON.parse(wx.getStorageSync(STORAGE_KEY_USER_INFO))
        : {
            token: "",
            userId: "",
            userName: "",
            openId: ""
          };
      state.isLogin = false;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  actions: {
    getUserInfo({ state, commit }) {
      // 获取用户权限信息
      return commit("getUserInfo");
    }
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
    getToken(state) {
      return state.token;
    }
  }
};
export default user;
