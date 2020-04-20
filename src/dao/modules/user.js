// 用户权限
import { user } from "@/dao/api";
import axios from '@/dao/index.js'

// export function registered(params) {
//   return axios({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

export function getOpenIdEnd(params = {}) {
  return axios({
    method: "Post",
    url: user.login,
    data: params
  });
}

const USER = {
  // 注册
  registered() {},

  // login() {
  //   // 登录
  //   return axios
  //     .post(user.login)
  //     .then(rt => {
  //       return rt
  //     })
  //     .catch(err => {
  //       return Promise.reject(err)
  //     })
  // },
  logOut(params = {}) {
    // 退出登录
    return axios
      .post(user.logOut, params)
      .then(rt => {
        return rt;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  getUserAuth(params = {}) {
    // 获取用户权限信息

    return axios
      .post(user.getUserAuth, params)
      .then(rt => {
        return rt;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  updateOwnPwd(params = {}) {
    // 修改密码

    return axios
      .post(user.updateOwnPwd, params)
      .then(rt => {
        return rt;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  findByOrgCode(params = new URLSearchParams()) {
    // 获取所有车厂

    return axios
      .post(user.findByOrgCode, params)
      .then(rt => {
        return rt;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  getOrgUsers(orgCode) {
    // 获取组织机构下的用户
    let params = { orgCode };
    return axios
      .get(user.orgUsers, { params })
      .then(rt => {
        return rt;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
};

// export default USER
