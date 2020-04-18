import axios from 'axios'

const deleteList = ({ id = '', url, _self, params = new URLSearchParams(), confirmMsg = '确定删除这1项吗？' }, successCallback, errorCallback) => {

    _self.$confirm('', {
        message: confirmMsg,
        title: '提示',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {

        return axios.post(url, params)

            .then(res => {

                // 成功操作
                _self.$message({ type: 'success', message: '操作成功' })
                return successCallback()

            })

            .catch(err => {

                // 失败操作
                _self.$message.error(`${err.response.data.msg || '操作失败'}，请重试`)

                if (typeof errorCallback == 'undefined') {
                    return successCallback()
                }

                return errorCallback()
            })

    }).catch(() => {

     })
}


export {
    deleteList
}