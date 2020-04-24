import axios from '@/dao/index.js'

const url = "/mvc/word"
export function selectNewWord(params = {}) {
  return axios({
    method: "get",
    url: url + "/selectNewWord",
    params: params
  });
}


export function getWordTestList(params = {}) {
  return axios({
    method: "get",
    url: url + "/getWordTestList",
    params: params
  });
}


