import permission from '@/directives/_ls/permission'

const initLs = (app) => {
	// 注册自定义指令
	app.directive('permission', permission)
}

export default initLs
