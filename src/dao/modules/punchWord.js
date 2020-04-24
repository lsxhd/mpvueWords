import axios from '@/dao/index.js'

const url = "/mvc/punch-word"
export function getPunchWord(params = {}) {
  return axios({
    method: "get",
    url: url + "/getPunchWord",
    data: params
  });
}
export function punch(params = {}) {
  return axios({
    method: "get",
    url: url + "/punch",
    data: params
  });
}


