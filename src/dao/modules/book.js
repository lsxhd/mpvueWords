import axios from '@/dao/index.js'

const url = "/mvc/dang-book"
export function getBookList(params = {}) {
  return axios({
    method: "get",
    url: url + "/getBookList",
    data: params
  });
}

export function getBookById(params = {}) {
  return axios({
    method: "get",
    url: url + "/getBookById",
    params: params
  });
}

export function getBookListByType(params = {}) {
  return axios({
    method: "get",
    url: url + "/getBookListByType",
    params: params
  });
}

export function getBookListBySearch(params = {}) {
  return axios({
    method: "post",
    url: url + "/getBookListBySearch",
    data: params
  });
}
