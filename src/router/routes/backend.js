import { getTree } from '@/api/__mock__/backend/_ls/systemManage/menu'

let menuTree = []
// 获取所有vue组件引用地址 用于构建路由
const modules = import.meta.glob('@/views/backend/**/**.vue')

/**
 * 获取菜单树
 */
const fetchMenuTree = async () => {
	const resp = await getTree()
	if (resp.IsSuccess === '1') {
		menuTree = resp.data || []
		console.log('菜单树 => ', menuTree)
	}
}
await fetchMenuTree()

const initBackendRoute = (routes) => {
	routes.push(
		...[
			{
		        path: '/backend',
		        redirect: '/backend/index',
		    },
			{
		        path: '/backend/index',
		        component: () => import('@/layout/backend/index.vue'),
				redirect: import.meta.env.VITE_APP_BACKEND_HOME,
				children: [
					// 重定向（用于局部刷新）
					{
				        path: '/backend/ls-redirect/:path(.*)',
				        component: () => import('@/views/backend/_ls/lsRedirect.vue'),
						meta: { type: '2' }
				     },
					// 首页
					{
						name: 'LSBackendHome',
						path: import.meta.env.VITE_APP_BACKEND_HOME,
				        component: () => import('@/views/backend/home.vue'),
						meta: {
							key: '-1',
							type: '2',
							url: import.meta.env.VITE_APP_BACKEND_HOME,
							title: '首页',
							isBackend: true,
						},
					},
					...createBackendRoutes(menuTree)
				]
		    },
		]
	)
}

/**
 * 根据菜单树生成后台路由
 *
 * @param {*} menuTree
 */
const createBackendRoutes = (menuTree) => {
	const routes = []
	for (const item of menuTree) {
		// 菜单目录 / 菜单项 / iframe
		if (item.type === '1' || item.type === '2' || item.type === '3') {
			// 菜单项路由
			if (item.type === '2') {
				// 路由
				const route = {
					name: `LSBackendRoute-${item.menu_id}`,
					path: item.url.split('?')[0],  // 去掉参数部分
					// component: modules[`/src/views${item.component}`],
					// 使用这种方式才能命中缓存
					component: async () => {
						const mod = await modules[`/src/views${item.component}`]()

					  	// 动态注入 name（核心）
					  	if (!mod.default.name) {
					  	  	mod.default.name = `LSBackendRoute-${item.menu_id}`
					  	}

					  	return mod
					},
					// component: (resolve) => require([`/views/${item.component}`], resolve),
					meta: {
						key: item.menu_id,
						type: item.type,
						url: item.url,
						link: item.link,
						title: item.menu_name,
						isBackend: true,
						// 页面缓存
						pageCache: item.page_cache === '1',
					},
				}
				routes.push(route)
			}
			// iframe路由
			else if (item.type === '3') {
				// 路由
				const route = {
					name: `LSBackendRoute-${item.menu_id}`,
					path: item.url.split('?')[0],  // 去掉参数部分
					// component: modules[`/src/views${item.component}`],
					// 使用这种方式才能命中缓存
					component: async () => {
						const mod = await modules['/src/views/backend/_ls/lsIframe.vue']()

					  	// 动态注入 name（核心）
					  	if (!mod.default.name) {
					  	  	mod.default.name = `LSBackendRoute-${item.menu_id}`
					  	}

					  	return mod
					},
					// component: (resolve) => require([`/views/${item.component}`], resolve),
					meta: {
						key: item.menu_id,
						type: item.type,
						url: item.url,
						link: item.link,
						title: item.menu_name,
						isBackend: true,
						// 页面缓存
						pageCache: item.page_cache === '1',
					},
				}
				routes.push(route)
			}

			routes.push(...createBackendRoutes(item.child_menu || []))
		}
	}
	return routes
}

export { menuTree, initBackendRoute }

/**
 * 后台路由
 */
export const getBackendRoutes = () => {
	const baseRoutes = [
		{
	        path: import.meta.env.VITE_APP_BACKEND_HOME,
	        component: () => import('@/views/backend/home.vue'),
			meta: {
				title: '首页',
				isBackend: true
			}
	    },
	]

	return [
		...baseRoutes,
		{
			meta: {
				title: '用户管理',
				isBackend: true
			}
		},
		{
	        path: '/backend/ls/systemManage/user',
	        component: () => import('@/views/backend/_ls/systemManage/user/index.vue'),
			meta: {
				title: '用户管理',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/systemManage/role',
	        component: () => import('@/views/backend/_ls/systemManage/role/index.vue'),
			meta: {
				title: '角色管理',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/systemManage/menu',
	        component: () => import('@/views/backend/_ls/systemManage/menu/index.vue'),
			meta: {
				title: '菜单管理',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/systemManage/systemConfig',
	        component: () => import('@/views/backend/_ls/systemManage/systemConfig/index.vue'),
			meta: {
				title: '系统配置管理',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/systemManage/timedTask',
	        component: () => import('@/views/backend/_ls/systemManage/timedTask/index.vue'),
			meta: {
				title: '定时任务管理',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/serverManage/log',
	        component: () => import('@/views/backend/_ls/serverManage/log/index.vue'),
			meta: {
				title: '日志',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/serverManage/server',
	        component: () => import('@/views/backend/_ls/serverManage/server/index.vue'),
			meta: {
				title: '服务器监控',
				isBackend: true
			}
	    },
		{
	        path: '/backend/ls/serverManage/cache',
	        component: () => import('@/views/backend/_ls/serverManage/cache/index.vue'),
			meta: {
				title: '缓存监控',
				isBackend: true
			}
	    },
	]
}

