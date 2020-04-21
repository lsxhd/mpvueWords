import axios from '@/dao/index.js'

const url = "/mvc/plan"
export function getPlan(params = {}) {
  return axios({
    method: "get",
    url: url + "/getPlan",
    data: params
  });
}

export function updatePlan(params = {}) {
    return axios({
      method: "post",
      url: url + "/updatePlan",
      data: params
    });
  }
  
