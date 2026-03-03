<template>
	<div
		v-if="route.meta.type === '2'"
		id="ls-content"
		:class="isHeaderFixed ? 'scroll-y' : ''"
		:style="{ height: enableMultiTab ? `calc(100% - 40px)` : '100%' }"
	>
		<!-- 页面内容 -->
		<!-- <router-view v-slot="{ Component, route }"> -->
		<router-view v-slot="{ Component }">
			<keep-alive :include="keepAliveList">
				<component :is="Component" :key="route.name"/>
			</keep-alive>
		</router-view>
	</div>
	<div
		v-else-if="route.meta.type === '3'"
		id="ls-content"
		:style="{ height: enableMultiTab ? `calc(100% - 40px)` : '100%' }"
	>
		<router-view/>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
	isHeaderFixed: { type: Boolean, default: true },
	enableMultiTab: { type: Boolean, default: true },
	// 缓存页面的name列表，配合路由meta中的keepAlive属性使用
	keepAliveList: {
		type: Array,
		default: () => []
	}
})
</script>

<style scoped>
#ls-content {
	background-color: #f5f5f5;
}
.scroll-y {
    overflow-y: auto;
}
</style>
