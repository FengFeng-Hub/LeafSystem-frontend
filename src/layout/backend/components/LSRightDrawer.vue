<template>
	<a-drawer
		title="系统设置"
		placement="right"
		:open="open"
		@close="onClose"
	>
		<a-form
			labelAlign="right"
			layout="horizontal"
		    :labelCol="{ span: 8 }"
		>
			<a-divider>菜单设置</a-divider>
			<a-form-item label="菜单主题">
				<a-radio-group v-model:value="menuTheme" style="width: 100%">
		            <a-radio-button value="dark" style="width: 50%;text-align: center">侧边栏暗色</a-radio-button>
		            <a-radio-button value="light" style="width: 50%;text-align: center">侧边栏亮色</a-radio-button>
		        </a-radio-group>
		    </a-form-item>
			<a-form-item label="菜单宽度">
				<a-input-number v-model:value="menuWidth" :min="80" :max="4096"/>
			</a-form-item>
			<a-form-item label="只展开当前菜单">
				<a-switch v-model:checked="isOnlyOpenCurrentMenu"/>
			</a-form-item>

        	<a-divider>其他设置</a-divider>
			<a-form-item label="固定头部">
				<a-switch v-model:checked="isHeaderFixed"/>
			</a-form-item>
			<a-form-item label="启动多页签">
				<a-switch v-model:checked="enableMultiTab"/>
			</a-form-item>
			<a-form-item label="页脚显示">
				<a-switch v-model:checked="footerVisible"/>
			</a-form-item>
		</a-form>
	</a-drawer>
</template>

<script setup>
const open = defineModel('open')

// 菜单主题
const menuTheme = defineModel('menuTheme')
// 菜单宽度
const menuWidth = defineModel('menuWidth')
// 是否只展开当前菜单
const isOnlyOpenCurrentMenu = defineModel('isOnlyOpenCurrentMenu')
// 固定头部
const isHeaderFixed = defineModel('isHeaderFixed')
// 启动多页签
const enableMultiTab = defineModel('enableMultiTab')
// 页脚显示
const footerVisible = defineModel('footerVisible')

const onClose = () => {
  	open.value = false
}
</script>
