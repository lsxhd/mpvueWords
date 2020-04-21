const STORAGE_KEY_USER_INFO = "userInfo";
const STORAGE_KEY_USER_TOKEN = "token";
const plan = {
  namespaced: true,
  state: {
    plan: {
      planId: 0,
      numberDay: 0,
      wordCount: 0
    },
    tag: {
      tagId: 0,
      name: "",
      type: ""
    }
  },
  mutations: {
    //登录操作
    setPlan(state, plan) {
      state.plan = plan;
    },
    setTag(state, tag) {
      state.tag = tag;
    },
    setPlanAndTag(state, plan, tag) {
      state.plan = plan;
      state.tag = tag;
    }
  },
  actions: {},
  getters: {}
};
export default plan;
