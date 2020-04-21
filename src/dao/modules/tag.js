import axios from '@/dao/index.js'

const url = "/mvc/tag"
export function getTagList(params = {}) {
  return axios({
    method: "get",
    url: url + "/getTagList",
    data: params
  });
}


