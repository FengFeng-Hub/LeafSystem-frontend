import request from '@/utils/request'

// 获取角色列表
export function getPage(params) {
    return request({
        url: '/system/api/role/getRoleList',
        method: 'get',
        params
    })
}
