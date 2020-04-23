import axios from "axios";
import qs from "qs";
import store from "@/store/index";

// 时间戳
const NewTimeStamp = new Date().getTime();

axios.defaults.baseURL = "https://dai.xiaomy.net/";
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    let { token, userId, openId } = store.state.user.userInfo;
    console.log("store.state.user.userInfo", store.state.user.userInfo);
    if (config.method.toUpperCase() == "GET") {
      // 追加userId
      if (config.params == null) {
        config.params = {};
      }
      if (userId) {
        config.params.userId = config.params.userId
        ? config.params.userId
        : userId;
      }
      
      if (openId) {
        config.params.openId = config.params.openId
        ? config.params.openId
        : openId;
      }
      
      // 防止登录拦截
      // config.params.filter = "sli_admin";
      // get请求防止缓存
      config.params
        ? (config.params._ = Date.now())
        : (config.params = {
            _: Date.now()
          });
    }
    if (config.method.toUpperCase() == "POST") {
      // if (userId) {
      //   config.data.userId = config.data.userId
      //   ? config.data.userId
      //   : userId;
      // }

      // if (openId) {
      //   config.data.openId = config.data.openId
      //   ? config.data.openId
      //   : openId;
      // }
    }
    console.log("data qian ",config)
    let data = config.method === "get" ? config.params : config.data;
    console.log("data hou ",config)
    // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
    console.log("config", config);
    wx.request({
      url: config.baseURL + config.url,
      method: config.method,
      data: data,
      header: {
        "Authorization": token
      },
      success: res => {
        return resolve(res);
      },
      fail: err => {
        return reject(err);
      }
    });
  });
};
// axios 拦截器
function Instance() {
  //请求拦截器
  axios.interceptors.request.use(
    function(request) {
      // console.log("request", request);
      // let { token, userId, openId } = store.state.user.userInfo;
      // if (request.method.toUpperCase() == "GET") {
      //   // 追加userId
      //   if (request.data == null) {
      //     request.data = {};
      //   }
      //   request.headers.Authorization = request.headers.Authorization
      //     ? request.headers.Authorization
      //     : token;

      //   request.data.userId = request.data.userId
      //     ? request.data.userId
      //     : userId;
      //   // 防止登录拦截
      //   // config.params.filter = "sli_admin";
      //   // get请求防止缓存
      //   request.data
      //     ? (request.data._ = Date.now())
      //     : (request.data = {
      //         _: Date.now()
      //       });
      // }
      // if (request.method.toUpperCase() == "POST") {
      //   if (typeof config.data !== "string") {
      //     // 追加userId
      //     if (!config.data.has("userId")) {
      //       config.data.append("userId", userId);
      //     }
      //   }
      // }
      // console.log(request) //请求成功
      return request;
    },
    function(error) {
      // console.log(error); //请求失败
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    function(response) {
      console.log(response.data.data); //响应成功
      return response;
    },
    function(error) {
      // console.log(error); //响应失败
      return Promise.reject(error);
    }
  );
}
export default axios;
Instance();

function get(url, params) {
  return axios({
    method: "get",
    url: url,
    params: params
  });
}
function post(url, params) {
  return axios({
    method: "post",
    url: url,
    data: params
  });
}
