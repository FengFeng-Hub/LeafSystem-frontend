export const getTree = async () => {
	return {
		IsSuccess: '1',
		data: [
		    {
		        menu_id: '2',
		        menu_name: '系统管理',
		        menu_icon: 'SettingOutlined',
		        url: '',
		        type: '1',
		        is_show: '1',
		        child_menu: [
		            {
		                menu_id: '3',
		                menu_name: '用户管理',
		                menu_icon: 'user-outlined',
		                url: '/backend/ls/systemManage/user',
						component: '/backend/_ls/systemManage/user/index.vue',
		                type: '2',
		                is_show: '1',
						page_cache: '1',
		            },
					{
		                menu_id: '4',
		                menu_name: '角色管理',
		                menu_icon: 'TeamOutlined',
		                url: '/backend/ls/systemManage/role',
						component: '/backend/_ls/systemManage/role/index.vue',
		                type: '2',
		                is_show: '1',
						page_cache: '0',
		            },
					{
		                menu_id: '5',
		                menu_name: '菜单管理',
		                menu_icon: 'user-outlined',
		                url: '/backend/ls/systemManage/menu',
						component: '/backend/_ls/systemManage/menu/index.vue',
		                type: '2',
		                is_show: '1',
						// child_menu: [
						// 	{
						// 		menu_id: '12',
						// 		menu_name: '菜单管理详情页',
						// 		menu_icon: '',
						// 		type: '2',
						// 		is_show: '1',
						// 		url: '/backend/ls/systemManage/menu/:id',
						// 		component: '/backend/_ls/systemManage/menu/index.vue',
						// 	}
						// ]
		            },
					{
						menu_id: '121',
						menu_name: '菜单管理详情页',
						menu_icon: '',
						type: '2',
						is_show: '0',
						url: '/backend/ls/systemManage/menu/edit?id=123',
						component: '/backend/_ls/systemManage/menu/edit.vue',
					},
		            {
		                menu_id: '6',
		                menu_name: '系统配置管理',
		                menu_icon: 'TeamOutlined',
		                url: '/backend/ls/systemManage/systemConfig',
						component: '/backend/_ls/systemManage/systemConfig/index.vue',
		                type: '2',
		                is_show: '1'
		            },
					{
		                menu_id: '7',
		                menu_name: '定时任务管理',
		                menu_icon: 'TeamOutlined',
		                url: '/backend/ls/systemManage/timedTask',
						component: '/backend/_ls/systemManage/timedTask/index.vue',
		                type: '2',
		                is_show: '1'
		            }
		        ]
		    },
			{
		        menu_id: '8',
		        menu_name: '服务器管理',
		        menu_icon: 'SettingOutlined',
		        url: '',
		        type: '1',
		        is_show: '1',
		        child_menu: [
		            {
		                menu_id: '9',
		                menu_name: '日志',
		                menu_icon: 'user-outlined',
		                url: '/backend/ls/serverManage/log',
						component: '/backend/_ls/serverManage/log/index.vue',
		                type: '2',
		                is_show: '1'
		            },
					{
		                menu_id: '10',
		                menu_name: '服务器监控',
		                menu_icon: 'TeamOutlined',
		                url: '/backend/ls/serverManage/server',
						component: '/backend/_ls/serverManage/server/index.vue',
		                type: '2',
		                is_show: '1'
		            },
					{
		                menu_id: '11',
		                menu_name: '缓存监控',
		                menu_icon: 'user-outlined',
		                url: '/backend/ls/serverManage/cache',
						component: '/backend/_ls/serverManage/cache/index.vue',
		                type: '2',
		                is_show: '1'
		            },
		        ]
			},
			{
		        menu_id: '12',
		        menu_name: '测试',
		        menu_icon: 'SettingOutlined',
		        url: '',
		        type: '1',
		        is_show: '1',
				child_menu: [
		            {
		                menu_id: '13',
		                menu_name: 'iframe',
		                menu_icon: 'user-outlined',
						url: '/backend/ls/test/csdn',
		                link: 'https://blog.csdn.net/',
						component: '',
		                type: '3',
		                is_show: '1',
		            },
					{
		                menu_id: '14',
		                menu_name: '此页面',
		                menu_icon: 'user-outlined',
						url: '',
		                link: 'https://www.baidu.com',
						component: '',
		                type: '4',
		                is_show: '1'
		            },
					{
		                menu_id: '15',
		                menu_name: '新页面',
		                menu_icon: 'user-outlined',
						url: '',
		                link: 'https://www.antdv.com/components/overview-cn',
						component: '',
		                type: '5',
		                is_show: '1'
		            },
				]
			}
		]
	}
}
