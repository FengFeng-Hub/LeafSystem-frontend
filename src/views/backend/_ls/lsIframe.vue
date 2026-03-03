<template>
	<iframe :src="route.meta.link" frameborder="0" class="ls-iframe"></iframe>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.ls-iframe {
	width: 100%;
	height: 100%;
}
</style>
