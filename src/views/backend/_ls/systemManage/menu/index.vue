<template>
	菜单管理
	<a-button @click="handleEdit">编辑</a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleEdit = () => {
	router.push({
		path: '/backend/ls/systemManage/menu/edit',
		query: {
			id: 1
		}
	})
}
</script>
