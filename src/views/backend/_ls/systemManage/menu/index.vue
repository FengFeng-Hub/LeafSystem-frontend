<template>
	菜单管理
	<br>
	1 <a-button @click="handleEdit(1)">编辑</a-button><br>
	2 <a-button @click="handleEdit(2)">编辑</a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleEdit = (id) => {
	router.push({
		path: '/backend/ls/systemManage/menu/edit',
		query: {
			id: id
		}
	})
}
</script>
