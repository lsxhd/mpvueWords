import axios from '@/dao/index.js'

const url = "/mvc/study"
export function saveStudyWord(params = {}) {
  return axios({
    method: "post",
    url: url + "/saveStudyWord",
    data: params
  });
}


