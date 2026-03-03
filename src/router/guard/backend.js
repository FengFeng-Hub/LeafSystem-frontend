import { useBackendStore } from '@/store/_ls/store'

const backendRoute = []

/**
 * 初始化后台路由守卫
 *
 * @param {*} router router
 */
export const initBackendGuard = (router) => {
	router.beforeEach(async (to, from) => {
		// 不是后台路由直接放行
		if (!to.meta?.isBackend) {
			return true
		}

		const backendStore = useBackendStore()

		// 设置标题
		document.title = `${import.meta.env.VITE_APP_TITLE} - ${to.meta?.title}`

		await backendStore.getUserInfo()
	})
}

/**
 * 根据菜单树生成后台路由
 *
 * @param {*} menuTree
 */
const createBackendRoutes = (menuTree) => {
	const routes = []
	for (const item of menuTree) {
		// 菜单目录 / 菜单项
		if (item.type === '1' || item.type === '2') {
			// 路由
			const route = {
				meta: {
					title: item.menu_name,
					isBackend: true,
				},
			}

			// 菜单项路由
			if (item.type === '2') {
				route.path = item.url
				route.path = item.url.replace(/^\/backend\//, '')
				route.component = () => import(`@/views${item.component}`)
				// 页面缓存
				route.meta.pageCache = item.page_cache === '1'
			}

			if (item.child_menu && item.child_menu.length > 0) {
				route.children = createBackendRoutes(item.child_menu)
			}

			routes.push(route)
		}
	}
	return routes
}
