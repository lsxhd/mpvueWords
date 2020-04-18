export default {
    data() {
        return {
            paginationData: {
                pageNo: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        getIndex(index) {
            return this.paginationData.pageSize * (this.paginationData.pageNo - 1)
                + index + 1
        }
    }
}
