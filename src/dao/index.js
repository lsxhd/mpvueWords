import axios from "axios";
import store from "@/store/";

axios.defaults.timeout = 60000;
axios.defaults.withFailTips = false;
axios.defaults.withErrorTips = false;
axios.defaults.withCredentials = true;

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    // let { IATOKEN, userId, jtoken } = store.state.commonParams;
    // config.headers.common["jtoken"] = jtoken;

    // let skillNluComponent = store.state.common.nluComponent;
    // // let userId = "590";
    // // console.log(config);
    // if (config.method.toUpperCase() == "GET") {
    //   // 追加userId
    //   if (config.params == null) {
    //     config.params = {};
    //   }
    //   config.params.userId = config.params.userId
    //     ? config.params.userId
    //     : userId;
    //   config.params.IATOKEN = config.params.IATOKEN
    //     ? config.params.IATOKEN
    //     : IATOKEN;
    //   // 防止登录拦截
    //   // config.params.filter = "sli_admin";
    //   // get请求防止缓存
    //   config.params
    //     ? (config.params._ = Date.now())
    //     : (config.params = {
    //         _: Date.now()
    //       });
    //   // 设置默认nluComponent
    //   if (config.params.nluComponent == null) {
    //     config.params.nluComponent = skillNluComponent;
    //   }
    // }
    // if (config.method.toUpperCase() == "POST") {
    //   if (typeof config.data !== "string") {
    //     // 追加userId
    //     if (!config.data.has("userId")) {
    //       config.data.append("userId", userId);
    //     }
    //     // 追加userId
    //     if (!config.data.has("IATOKEN")) {
    //       config.data.append("IATOKEN", IATOKEN);
    //     }

    //     // 防止登录拦截
    //     // config.data.append("filter", "sli_admin");
    //     // 设置默认nluComponent
    //     if (!config.data.has("nluComponent")) {
    //       config.data.append("nluComponent", skillNluComponent);
    //     }
    //   }
    // }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function(response) {
    if (!response) {
      return Promise.reject({ response });
    }
    if (response && response.status != "200") {
      return Promise.reject({ response });
    }
    var data = response.data;
    if (data.code !== 0) {
      return Promise.reject({ response });
    }
    return response;
  },
  function(error) {
    var response = error.response;
    var status = response && response.status;
    var statusText = response && response.statusText;
    if (statusText == "timeout") {
      console.error("网络连接超时！");
    } else if (status == 550) {
      console.error("网络连接超时！");
    } else if (response.data.code == 403) {
      console.error("网络连接超时！");
    } else if (status == 404) {
      console.error("网络连接超时！");
    } else if (status == 500) {
      console.error("网络连接超时！");
    }
    return Promise.reject(error);
  }
);

export default axios;
