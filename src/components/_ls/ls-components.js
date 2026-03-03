import { defineAsyncComponent } from 'vue'

export const AntdIcon = defineAsyncComponent(
	() => import("./antd/LSAntdIcon.vue"),
)

export const AntdMenu = defineAsyncComponent(
	() => import("./antd/LSAntdMenu.vue"),
)

export const AntdModel = defineAsyncComponent(
	() => import("./antd/LSAntdModel.vue"),
)

export const LSTableOperator = defineAsyncComponent(
	() => import("./layout/LSTableOperator.vue"),
)

// 也可以同时导出默认对象（可选）
export default {
	AntdIcon,
	AntdMenu,
	AntdModel,
	LSTableOperator,
}

