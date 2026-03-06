<template>
	<AntdModel
		v-model:open="open"
		title="用户"
	>
		<a-form
		    :model="formData"
			labelAlign="right"
			layout="horizontal"
		    :labelCol="{ span: 3 }"
	  	>
		    <a-form-item
		      	label="账号"
		      	name="username"
		    >
		      <a-input v-model:value="formData.username"/>
		    </a-form-item>

		    <a-form-item
				label="密码"
				name="password"
		    >
		      	<a-input-password v-model:value="formData.password"/>
		    </a-form-item>
	  	</a-form>
		<template #footer>
			<a-button type="primary">保存</a-button>
			<a-button>返回</a-button>
		</template>
	</AntdModel>
</template>

<script setup>
import { ref, watch } from 'vue'
import { AntdModel } from '@/components/_ls/ls-components'

const props = defineProps({
	id: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'view'
	}
})

// 打开对话框
const open = defineModel('open')

// 表单数据
const formData = ref({})

watch(open, (newVal) => {
	if (newVal) {
		console.log('打开对话框')
	}
})

const handleReturn = () => {
	open.value = false
}
</script>
