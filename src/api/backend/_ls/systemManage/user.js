import request from '@/utils/request'

// 获取用户列表
export function getPage(params) {
    return request({
        url: '/system/api/ls/user/getPage',
        method: 'get',
        params
    })
}