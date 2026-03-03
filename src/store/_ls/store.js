import { defineStore } from 'pinia'
import { setPermissions } from '@/utils/_ls/permission'

// 接口
import { getTree } from '@/api/__mock__/backend/_ls/systemManage/menu'

export const useBackendStore = defineStore('backend', {
  	state: () => ({
		// 是否首次加载
		isFirstLoad: true,
		// 菜单
		menu: {
			// 当前路由
			currentRouter: '/backend',
			// 菜单树
			menuTree: [],
		},
		// 用户
		userInfo: {
			// 用户信息
			data: {},
			// 是否登录
			isLogin: false,
			// 权限列表
	  	  	permissions: [],
			// 初始化权限标记
			permissionsInit: false,
		},
  	}),
  	actions: {
		async getMenuTree() {
			// 获取菜单树
			const resp = await getTree()
			if (resp.IsSuccess === '1') {
				this.menu.menuTree = resp.data || []
			} else {
				console.error('获取菜单树失败 => ', resp.Msg)
			}
			return this.menu.menuTree
		},
  	  	async getUserInfo() {
			if (this.userInfo.isLogin) {
				return this.userInfo
			}

			// 获取登录用户信息
			const isLoginResp = await isLogin()

			if (isLoginResp.IsSuccess !== '1') {
				this.isLogin = false
				return
			}

			this.userInfo.data = isLoginResp.data
			this.userInfo.isLogin = true

			// 获取权限信息
  	  	  	const permissionResp = await getRoleMenuPermissionKeyList()
			if (permissionResp.data && permissionResp.data.length > 0) {
				this.userInfo.permissions = permissionResp.data.map((item) => {
					return item.permission_key
				})
			} else {
  	  	  		this.userInfo.permissions = []
			}
			this.permissionsInit = true

			console.log('后台用户 => ', this.userInfo.data.name)
	      	setPermissions(this.userInfo.permissions)
			return this.userInfo
  	  	},
		clearUserInfo() {
			this.userInfo = {
				data: {},
				isLogin: false,
		  	  	permissions: [],
				permissionsInit: false,
			}
		},
  	}
})

// 模拟数据
const isLogin = async () => {
	return {
	    "data": {
	        "birthday": "2023-10-18",
	        "personal_signature": "欢迎使用Leaf后台管理系统",
	        "role_list": [
	            {
	                "role_name": "开发用户",
	                "role_id": "1"
	            }
	        ],
	        "phone": "2023-10-18",
	        "sex": "3",
	        "name": "leaf admin",
	        "is_disable": null,
	        "avatar": "/public/img/system/default_avatar.jpg",
	        "account": "leafadmin",
	        "email": "3186786629@qq.com"
	    },
	    "IsSuccess": "1",
	    "Msg": null,
	    "Count": null,
	    "Code": null
	}
}
const getRoleMenuPermissionKeyList = async () => {
	return {
	    "data": [
	        {
	            "permission_key": "lspk:ls:menu:list",
	            "menu_id": "7"
	        },
	        {
	            "permission_key": "lspk:ls:menu:edit",
	            "menu_id": "8"
	        },
	        {
	            "permission_key": "lspk:ls:menu:add",
	            "menu_id": "9"
	        },
	        {
	            "permission_key": "lspk:ls:menu:delete",
	            "menu_id": "10"
	        },
	        {
	            "permission_key": "lspk:ls:menu:edit:sort",
	            "menu_id": "11"
	        },
	        {
	            "permission_key": "lspk:ls:menu:edit:isShow",
	            "menu_id": "12"
	        },
	        {
	            "permission_key": "lspk:ls:role:list",
	            "menu_id": "14"
	        },
	        {
	            "permission_key": "lspk:ls:role:edit",
	            "menu_id": "15"
	        },
	        {
	            "permission_key": "lspk:ls:role:add",
	            "menu_id": "16"
	        },
	        {
	            "permission_key": "lspk:ls:role:delete",
	            "menu_id": "17"
	        },
	        {
	            "permission_key": "lspk:ls:role:edit:isAllowLoginBackend",
	            "menu_id": "18"
	        },
	        {
	            "permission_key": "lspk:ls:role:edit:isDisable",
	            "menu_id": "19"
	        },
	        {
	            "permission_key": "lspk:ls:role:menu:list",
	            "menu_id": "21"
	        },
	        {
	            "permission_key": "lspk:ls:role:menu:edit",
	            "menu_id": "22"
	        },
	        {
	            "permission_key": "lspk:ls:user:list",
	            "menu_id": "24"
	        },
	        {
	            "permission_key": "lspk:ls:user:edit",
	            "menu_id": "25"
	        },
	        {
	            "permission_key": "lspk:ls:user:add",
	            "menu_id": "26"
	        },
	        {
	            "permission_key": "lspk:ls:user:delete",
	            "menu_id": "27"
	        },
	        {
	            "permission_key": "lspk:ls:user:edit:isDisable",
	            "menu_id": "28"
	        },
	        {
	            "permission_key": "lspk:ls:user:edit:sex",
	            "menu_id": "29"
	        },
	        {
	            "permission_key": "lspk:ls:systemConfig:list",
	            "menu_id": "31"
	        },
	        {
	            "permission_key": "lspk:ls:systemConfig:edit",
	            "menu_id": "32"
	        },
	        {
	            "permission_key": "lspk:ls:systemConfig:add",
	            "menu_id": "33"
	        },
	        {
	            "permission_key": "lspk:ls:systemConfig:delete",
	            "menu_id": "34"
	        },
	        {
	            "permission_key": "lspk:ls:log:get",
	            "menu_id": "37"
	        },
	        {
	            "permission_key": "lspk:ls:log:rename",
	            "menu_id": "38"
	        },
	        {
	            "permission_key": "lspk:ls:log:delete",
	            "menu_id": "39"
	        },
	        {
	            "permission_key": "lspk:ls:server:serverInfo",
	            "menu_id": "40"
	        },
	        {
	            "permission_key": "lspk:ls:server:cacheInfo",
	            "menu_id": "42"
	        },
	        {
	            "permission_key": "lspk:ls:server:deleteCache",
	            "menu_id": "43"
	        },
	        {
	            "permission_key": "lspk:ls:codeGeneration:DBTableInfo",
	            "menu_id": "45"
	        },
	        {
	            "permission_key": "lspk:ls:codeGeneration:DBTableFieldInfo",
	            "menu_id": "46"
	        },
	        {
	            "permission_key": "lspk:ls:codeGeneration:generationCode",
	            "menu_id": "47"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:list",
	            "menu_id": "59"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:edit",
	            "menu_id": "60"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:add",
	            "menu_id": "61"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:delete",
	            "menu_id": "62"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:execute",
	            "menu_id": "63"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:start",
	            "menu_id": "64"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:pause",
	            "menu_id": "65"
	        },
	        {
	            "permission_key": "lspk:ls:timedTask:stop",
	            "menu_id": "66"
	        },
	        {
	            "permission_key": "lspk:ls:timedTaskLog:list",
	            "menu_id": "68"
	        },
	        {
	            "permission_key": "lspk:ls:timedTaskLog:delete",
	            "menu_id": "69"
	        },
	        {
	            "permission_key": "lspk:ls:user:edit:resetPwd",
	            "menu_id": "72"
	        },
	        {
	            "permission_key": "lspk:ls:user:updatePersonal",
	            "menu_id": "73"
	        }
	    ],
	    "IsSuccess": "1",
	    "Msg": "SQL执行成功",
	    "Count": "45",
	    "Code": null
}
}
