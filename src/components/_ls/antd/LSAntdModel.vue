<template>
	<a-modal
		v-model:open="open"
		:width="fullscreen ? '100%' : width"
		:centered="centered"
		:wrap-class-name="fullscreen ? 'modal full-modal' : ''"
		:keyboard="keyboard"
		:mask="mask"
		:maskClosable="maskClosable"
		:style="{
			top: top
		}"
	>
		<!-- 标题 -->
	    <template #title>
	      	<div ref="modalTitleRef" :class="enableDrag ? 'modal-drag-header' : ''">
	      	  	<template v-if="title">{{ title }}</template>
	      	  	<slot v-else name="title"></slot>
	      	</div>
	    </template>
		<!-- 内容 -->
	    <div class="modal-content" :style="{ maxHeight: maxHeight }">
	      	<slot></slot>
	    </div>

		<!-- 包裹 modal 实现 transform -->
	    <template v-if="enableDrag" #modalRender="{ originVNode }">
	      	<div :style="transformStyle"><component :is="originVNode"/></div>
	    </template>
		<!-- 页脚 -->
		<template #footer>
			<slot name="footer"></slot>
		</template>
	</a-modal>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue"

const props = defineProps({
	// 标题
	title: { type: String, default: null },
	// 距离顶部大小
	top: { type: String, default: '100px' },
	// 宽度
	width: { type: String, default: "800px" },
	// 最大高度
	maxHeight: { type: String, default: '60vh' },
	// 垂直居中显示
	centered: { type: Boolean, default: false },
	// 是否全屏
	fullscreen: { type: Boolean, default: false },
	// 是否支持键盘 esc 关闭
	keyboard: { type: Boolean, default: true },
	// 是否展示遮罩
	mask: { type: Boolean, default: true },
	// 点击蒙层是否允许关闭
	maskClosable: { type: Boolean, default: true },
	// 开启拖拽
	enableDrag: { type: Boolean, default: false },
})

// ---------- 拖拽逻辑 ----------

const open = defineModel("open", { default: false })

const modalTitleRef = ref(null)

const transformX = ref(0)
const transformY = ref(0)

const startX = ref(0)
const startY = ref(0)

const dragging = ref(false)

let dragRect = {
	left: 0,
	right: 0,
	top: 0,
	bottom: 0
}

// transform 样式
const transformStyle = computed(() => {
	return {
		transform: `translate(${transformX.value}px, ${transformY.value}px)`
	}
})

// 打开弹窗初始化拖拽
watch(open, async (val) => {
  	if (val) {
  	  	await nextTick()

		// 开启拖拽
		if (props.enableDrag) {
			const titleEl = modalTitleRef.value
	  	  	if (!titleEl) return

	  	  	titleEl.onmousedown = startDrag
		}
  	}
})

// 开始拖拽
function startDrag(e) {
  	const modal = modalTitleRef.value?.closest(".ant-modal")
  	if (!modal) return

  	dragging.value = true

  	startX.value = e.clientX
  	startY.value = e.clientY

  	const modalRect = modal.getBoundingClientRect()

  	const windowWidth = window.innerWidth
  	const windowHeight = window.innerHeight

  	// 计算可拖拽边界（核心）
  	dragRect.left = -modalRect.left
  	dragRect.right = windowWidth - modalRect.right
  	dragRect.top = -modalRect.top
  	dragRect.bottom = windowHeight - modalRect.bottom

  	document.addEventListener("mousemove", onMove)
  	document.addEventListener("mouseup", stopDrag)
}

// 拖拽移动
function onMove(e) {
  	if (!dragging.value) return

  	let moveX = e.clientX - startX.value
  	let moveY = e.clientY - startY.value

  	let x = transformX.value + moveX
  	let y = transformY.value + moveY

  	// 边界限制
  	x = Math.min(Math.max(dragRect.left, x), dragRect.right)
  	y = Math.min(Math.max(dragRect.top, y), dragRect.bottom)

  	transformX.value = x
  	transformY.value = y

  	startX.value = e.clientX
  	startY.value = e.clientY
}

// 停止拖拽
function stopDrag() {
  	dragging.value = false

  	document.removeEventListener("mousemove", onMove)
  	document.removeEventListener("mouseup", stopDrag)
}
</script>

<style scoped>
.full-modal .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
}
.full-modal .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
}
.full-modal .ant-modal-body {
    flex: 1;
}

.modal-content {
	overflow-y: auto;
}

.ant-modal-close button {
    appearance: auto;
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    cursor: default;
    box-sizing: border-box;
    background-color: buttonface;
    margin: 0em 0em 0em 0em;
    padding-block: 1px;
    padding-inline: 6px;
}

.modal-drag-header {
	width: 100%;
	cursor: move;
	user-select: none;
}
</style>
