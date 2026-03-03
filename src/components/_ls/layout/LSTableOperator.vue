<template>
    <div class="table-operator table-operator-btn-group">
        <slot name="btnGroup"></slot>
        <div class="table-operator table-operator-btn-group-right">
            <slot name="btnGroupRight"></slot>
			<!-- 刷新功能 -->
			 <a-button v-if="enableRefresh" type="text" :size="btnRightSize" shape="circle" @click="handleRefresh">
				<template #icon><ReloadOutlined/></template>
            </a-button>
			<!-- 全屏功能 -->
			<template v-if="enableFullScreen">
				<a-button v-if="isFullScreen" type="text" :size="btnRightSize" shape="circle" @click="handleFullScreenExit">
					<template #icon><FullscreenExitOutlined/></template>
	            </a-button>
	            <a-button v-else type="text" :size="btnRightSize" shape="circle" @click="handleFullScreen">
					<template #icon><FullscreenOutlined/></template>
	            </a-button>
			</template>
			<!-- 列展示功能 -->
			<a-tooltip v-if="enableColumnDisplay">
	        	<template #title>列展示</template>
				<a-dropdown :trigger="['click']" v-model:open="columnDisplayMenuVisible">
					<a-button type="text" :size="btnRightSize" shape="circle"><template #icon><TableOutlined/></template></a-button>
					<template #overlay>
				      	<a-menu @click="handleDropdownMenuClick">
					        <a-menu-item v-for="item in tableColumnsConfig">
								<a-checkbox v-model:checked="item.visible">{{ item.title }}</a-checkbox>
							</a-menu-item>
				      	</a-menu>
				    </template>
				</a-dropdown>
	      	</a-tooltip>
        </div>
    </div>
    <div class="table-operator table-operator-table">
        <slot name="table"></slot>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    // 右侧操作按钮大小  large | default | small
    btnRightSize: {
        type: String,
        default: 'default'
    },
	// 启用刷新功能
	enableRefresh: {
		type: Boolean,
		default: false
	},
	// 启用全屏功能
	enableFullScreen: {
		type: Boolean,
		default: false
	},
	// 启用列展示功能
	enableColumnDisplay: {
		type: Boolean,
		default: false
	}
})

// 表格列配置
const tableColumnsConfig = defineModel('tableColumnsConfig')

const emit = defineEmits(['handleRefresh'])

// ---------- 刷新 ----------
const handleRefresh = () => {
	emit('handleRefresh')
}

// ---------- 全屏 ----------
const isFullScreen = ref(false)

const handleFullScreen = () => {
	isFullScreen.value = !isFullScreen.value
    let target = document.getElementById("ls-content")

    if (!target) return

    // 兼容不同浏览器的全屏 API
    if (target.requestFullscreen) {
        target.requestFullscreen()
    } else if (target.webkitRequestFullscreen) { // Chrome, Safari
        target.webkitRequestFullscreen()
    } else if (target.mozRequestFullScreen) { // Firefox
        target.mozRequestFullScreen()
    } else if (target.msRequestFullscreen) { // IE/Edge
        target.msRequestFullscreen()
    }
}

const handleFullScreenExit = () => {
	isFullScreen.value = !isFullScreen.value

    // 兼容不同浏览器的全屏 API
	if (document.exitFullscreen) {
		document.exitFullscreen()
	} else if (document.webkitExitFullscreen) { // Chrome, Safari
		document.webkitExitFullscreen()
	} else if (document.mozCancelFullScreen) { // Firefox
		document.mozCancelFullScreen()
	} else if (document.msExitFullscreen) { // IE/Edge
		document.msExitFullscreen()
	}
}

// ---------- 列展示 ----------
// 列展示下拉菜单显示状态
const columnDisplayMenuVisible = ref(false)

// 下拉菜单点击事件
const handleDropdownMenuClick = ({ key }) => {}
</script>

<style scoped>
.table-operator-btn-group > * {
    margin-right: 10px;
}
.table-operator-btn-group :last-of-type {
    margin-right: 0;
}
.table-operator-btn-group-right {
    float: right;
}
.table-operator-btn-group-right > * {
    margin-left: 10px;
}
.table-operator-table {
    margin-top: 10px;
}
</style>
