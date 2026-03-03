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
			<template v-if="title">{{ title }}</template>
			<slot v-else name="title"></slot>
		</template>
		<div class="ant-modal-close">
			<!-- <a-button type="text"><CloseOutlined/></a-button> -->
		</div>
		<div
			class="modal-content"
			:style="{
				maxHeight: maxHeight,
			}"
		>
			<!-- 默认插槽 -->
			<slot></slot>
		</div>
		<!-- 页脚 -->
		<template #footer>
			<slot name="footer"></slot>
		</template>
	</a-modal>
</template>

<script setup>
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
})

const open = defineModel("open", { default: false })
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
</style>
