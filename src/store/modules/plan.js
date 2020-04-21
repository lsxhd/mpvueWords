const STORAGE_KEY_USER_INFO = "userInfo";
const STORAGE_KEY_USER_TOKEN = "token";
const plan = {
  namespaced: true,
  state: {
    plan: {
      planId: 0,
      numberDay: 0,
      totalNumber: 0
    },
    tag: {
      tagId: 0,
      name: "暂无",
      type: "暂无"
    }
  },
  mutations: {
    //登录操作
    setPlan(state, plan) {
      state.plan = plan;
    },
    setTag(state, tag) {
      state.tag = tag;
    }
   
  },
  actions: {},
  getters: {}
};
export default plan;
