<template>
	<a-row style="position: relative; background-color: #fff">
		<!-- 右键菜单（不包裹 Tabs DOM 结构） -->
		<a-dropdown :trigger="['contextmenu']">
			<a-tabs
				type="card"
				size="small"
				v-model:activeKey="currentUrl"
				@tabClick="handleChange"
				class="page-tabs-wrapper"
			>
				<a-tab-pane :key="homePath">
					<template #tab>
						<span class="tab-title" @contextmenu.prevent="handleContextTab('-1')">
							首页
							<ReloadOutlined v-if="activeKey === '-1'" class="tab-icon-right"/>
						</span>
					</template>
				</a-tab-pane>
				<a-tab-pane v-for="item in tabs" :key="item.url">
					<template #tab>
						<span class="tab-title" @contextmenu.prevent="handleContextTab(item.key)">
							{{ item.title }}

							<ReloadOutlined
								v-if="activeKey === item.key"
								class="tab-icon-right"
								@click.stop="handleRefresh"
							/>

							<CloseOutlined
								class="tab-icon-right"
								@click.stop="closeTab(item)"
							/>
						</span>
					</template>
				</a-tab-pane>
			</a-tabs>
			<template #overlay>
				<a-menu>
					<a-menu-item @click="closeOther(contextKey)">关闭其他</a-menu-item>
					<a-menu-item @click="closeAll">关闭所有</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>

		<!-- 操作区 -->
		<a-dropdown>
			<div class="page-tag-operate">
				<MoreOutlined/>
			</div>
			<template #overlay>
				<a-menu>
					<a-menu-item @click="closeOther(activeKey)">关闭其他</a-menu-item>
					<a-menu-item @click="closeAll">关闭所有</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
	</a-row>
</template>

<script setup>
import { defineModel, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const keepAliveList = defineModel('keepAliveList')

const emit = defineEmits(['handleRefresh'])

const route = useRoute()
const router = useRouter()

const tabs = ref([])
// 当前激活的 tab key
const activeKey = ref('')
// 当前 url（与 activeKey 区分开，activeKey 可能是 '-1' 代表首页）
const currentUrl = ref('')
// 右键激活的 tab key
const contextKey = ref('')

// 首页地址
const homePath = import.meta.env.VITE_APP_BACKEND_HOME

onMounted(() => {
	// 将当前路由加入到多页签（如果不存在）
	addTab(route.meta.key)
})

// 添加新标签页
const addTab = (newKey) => {
	if (!route.meta.isBackend) return

	activeKey.value = newKey
	currentUrl.value = route.meta.url

	// 首页
	if (newKey === '-1') return

	// 已经存在当前菜单
	if (tabs.value.some((t) => t.key === newKey)) return

	tabs.value.push({
		key: newKey,
		name: route.name,
		url: route.meta.url,
		title: route.meta.title,
	})
}

// 切换 tab
const handleChange = (url) => {
	console.log(url, ' - ', route.meta.url)
	if (url !== route.meta.url) {
		router.push(url)
	}
}

// 关闭单个
const closeTab = (item) => {
	const index = tabs.value.findIndex((t) => t.key === item.key)
	if (index === -1) return

	tabs.value.splice(index, 1)

	// 如果关闭的是当前激活的 tab，切换到左侧的 tab（如果存在）
	if (activeKey.value === item.key) {
		const next = tabs.value[index - 1] || tabs.value[index]
		router.push(next ? next.url : homePath)
	}

	// 清除当前组件缓存
	if (route.name === item.name) {
		keepAliveList.value = keepAliveList.value.filter(name => name !== route.name)
	}
};

// 关闭其他
const closeOther = (key) => {
	// 首页
	if (key === '-1') {
		tabs.value = []
		activeKey.value = '-1'
		currentUrl.value = homePath
		router.push(homePath)
		return
	}

	// 先找到目标 tab（在过滤前找）
	const target = tabs.value.find(t => t.key === key)

	if (!target) return

	// 只保留当前
	tabs.value = [target]

	// 同步状态
	activeKey.value = key
	currentUrl.value = target.url

	router.push(target.url)

	// 清除其他组件缓存
	keepAliveList.value = keepAliveList.value.filter(name => name === target.name)
}

// 关闭所有
const closeAll = () => {
	tabs.value = []
	router.push(homePath)

	// 清除所有组件缓存
	keepAliveList.value = []
}

// 刷新
const handleRefresh = () => {
	emit('handleRefresh')
}

// 右键事件
const handleContextTab = (key) => {
	contextKey.value = key
}

defineExpose({
	addTab,
})
</script>

<style scoped>
.page-tabs-wrapper {
	width: calc(100% - 50px);
	margin-left: 10px;
}

/* 覆盖 Tabs 样式 */
:deep(.ant-tabs-nav) {
	margin: 0;
}

:deep(.ant-tabs-nav::before) {
	border-bottom: none;
}

:deep(.ant-tabs-small > .ant-tabs-nav .ant-tabs-tab) {
	padding: 5px 10px;
	margin: 5px 2px 0 2px;
	height: 32px;
	border-bottom: none;
	border-radius: 6px 6px 0 0;
	background-color: #ffffff;
}

/* tab 标题 */
.tab-title {
	display: inline-flex;
	align-items: center;
}

.tab-icon-right {
	margin-left: 8px;
	margin-right: 0 !important;
	font-size: 10px;
	color: #666;
}

/* hover / active */
:deep(.ant-tabs-tab:hover),
:deep(.ant-tabs-tab-active) {
	background-color: #e6f4ff !important;
}

:deep(.ant-tabs-tab:hover) .tab-icon-right,
:deep(.ant-tabs-tab-active) .tab-icon-right {
	color: #1677ff;
}

.page-tag-operate {
	width: 40px;
	height: 40px;
	font-size: 17px;
	text-align: center;
	vertical-align: middle;
	line-height: 40px;
	padding: 0 10px;
	cursor: pointer;
}
</style>
