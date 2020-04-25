import axios from "@/dao/index.js";

const url = "/mvc/shop-car";
export function getShopCar(params = {}) {
  return axios({
    method: "get",
    url: url + "/getShopCar",
    params: params
  });
}

export function updateShopCar(params = {}) {
  return axios({
    method: "get",
    url: url + "/updateShopCar",
    params: params
  });
}
export function addShopCar(params = {}) {
  return axios({
    method: "get",
    url: url + "/addShopCar",
    params: params
  });
}

export function deleteShopCar(params = {}) {
  return axios({
    method: "get",
    url: url + "/deleteShopCar",
    params: params
  });
}

export function shopCarCount(params = {}) {
  return axios({
    method: "get",
    url: url + "/shopCarCount",
    params: params
  });
}

