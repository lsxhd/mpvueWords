// 用户权限
import { user } from "@/dao/api";
import axios from '@/dao/index.js'

export function getOpenIdEnd(params = {}) {
  return axios({
    method: "Post",
    url: user.login,
    data: params
  });
}

export function getUser(params = {}) {
  return axios({
    method: "Get",
    url: "/mvc/user/getUser",
    data: params
  });
}

export function pay(params = {}) {
  return axios({
    method: "Post",
    url: "/mvc/user/pay",
    data: params
  });
}

export function repay(params = {}) {
  return axios({
    method: "Post",
    url: "/mvc/user/repay",
    data: params
  });
}
