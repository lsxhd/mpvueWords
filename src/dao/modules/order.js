import axios from "@/dao/index.js";

const url = "/mvc/shop-order";
export function getOrder(params = {}) {
  return axios({
    method: "get",
    url: url + "/getOrder",
    params: params
  });
}

export function saveOrUpdate(params = {}) {
  return axios({
    method: "post",
    url: url + "/saveOrUpdate",
    data: params
  });
}

export function getOrderById(params = {}) {
  return axios({
    method: "post",
    url: url + "/getOrderById",
    data: params
  });
}
