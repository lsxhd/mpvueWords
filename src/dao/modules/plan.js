import axios from '@/dao/index.js'

const url = "/mvc/plan"
export function getPlan(params = {}) {
  return axios({
    method: "get",
    url: url + "/getPlan",
    data: params
  });
}


