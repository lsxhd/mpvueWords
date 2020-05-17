import axios from '@/dao/index.js'

const url = "/mvc/address"
export function getAddress(params = {}) {
  return axios({
    method: "get",
    url: url + "/getAddress",
    params: params
  });
}

export function getAddressById(params = {}) {
  return axios({
    method: "get",
    url: url + "/getAddressById",
    params: params
  });
}

export function getDefaultAddress(params = {}) {
  return axios({
    method: "get",
    url: url + "/getDefaultAddress",
    params: params
  });
}


export function saveOrupdateAddress(params = {}) {
    return axios({
      method: "post",
      url: url + "/saveOrupdateAddress",
      data: params
    });
  }
  
