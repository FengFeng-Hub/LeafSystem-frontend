import { sleep } from '@/utils/_ls/thread'

export async function getPage(params) {
	await sleep(500)
	return {
	    "data": [
	        {
	            "role_name": "角色3",
	            "ls_update_time": "2025-10-04 15:37:26",
	            "role_id": "9",
	            "ls_update_by": "leaf admin",
	            "ls_create_time": "2025-10-04 15:36:33",
	            "is_allow_login_backend": "1",
	            "is_disable": "0",
	            "ls_create_by": "leaf admin"
	        },
	        {
	            "role_name": "角色2",
	            "ls_update_time": null,
	            "role_id": "8",
	            "ls_update_by": null,
	            "ls_create_time": null,
	            "is_allow_login_backend": "0",
	            "is_disable": "0",
	            "ls_create_by": null
	        },
	        {
	            "role_name": "演示用户",
	            "ls_update_time": "2025-10-16 17:13:03",
	            "role_id": "7",
	            "ls_update_by": "admin.dev",
	            "ls_create_time": null,
	            "is_allow_login_backend": "1",
	            "is_disable": "0",
	            "ls_create_by": null
	        },
	        {
	            "role_name": "前台用户",
	            "ls_update_time": null,
	            "role_id": "6",
	            "ls_update_by": null,
	            "ls_create_time": null,
	            "is_allow_login_backend": "0",
	            "is_disable": "0",
	            "ls_create_by": null
	        },
	        {
	            "role_name": "中台用户",
	            "ls_update_time": null,
	            "role_id": "5",
	            "ls_update_by": null,
	            "ls_create_time": null,
	            "is_allow_login_backend": "0",
	            "is_disable": "0",
	            "ls_create_by": null
	        }
	    ],
	    "IsSuccess": "1",
	    "Msg": "SQL执行成功",
	    "Count": "9",
	    "Code": null
	}
}
