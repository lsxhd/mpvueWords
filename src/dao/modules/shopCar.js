import axios from '@/dao/index.js'

const url = "/mvc/shop-car"
export function getShopCar(params = {}) {
  return axios({
    method: "get",
    url: url + "/getShopCar",
    params: params
  });
}

