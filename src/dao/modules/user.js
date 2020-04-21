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


