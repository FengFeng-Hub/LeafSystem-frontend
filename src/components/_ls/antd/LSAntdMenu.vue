<template>
    <template v-for="item in data" :key="item[model.key]">
        <template v-if="model.hidden(item)">
			<template v-if="model.isItem(item)">
	            <a-menu-item :key="item[model.key]" @click="itemClick(item)">
	                <template #icon v-if="isNotEmpty(item[model.icon])"><AntdIcon :type="item[model.icon]"/></template>
	                {{ item[model.label] }}
	            </a-menu-item>
	        </template>
	        <template v-else>
	            <a-sub-menu :key="item[model.key]">
	                <template #icon v-if="isNotEmpty(item[model.icon])"><AntdIcon :type="item[model.icon]"/></template>
	                <template #title>{{ item[model.label] }}</template>
	                <LSAntdMenu
	                    v-if="item[model.children] && item[model.children].length > 0"
	                    :data="item[model.children]"
	                    :model="model"
	                    @itemClick="itemClick"
	                />
	            </a-sub-menu>
	        </template>
		</template>
    </template>
</template>

<script setup>
import { isNotEmpty } from '@/utils/_ls/StringUtils'

// 组件
import { AntdIcon } from '../ls-components'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  model: {
    type: Object,
    default: () => ({
        key: 'key',
        label: 'label',
        icon: 'icon',
        children: 'children',
		hidden: (item) => {
			return item.hidden
		},
        isItem: (item) => {
            return item.isItem
        }
    })
  }
})

const emit = defineEmits(['itemClick'])

// 点击菜单项事件
const itemClick = (item) => {
    emit('itemClick', item)
}
</script>
