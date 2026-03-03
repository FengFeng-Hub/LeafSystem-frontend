<template>
    <component :is="$antdIcons[kebabToPascal(type)]"/>
    <!-- <component :is="menuIcon(icon)"/> -->
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})

// 短横线转大驼峰
function kebabToPascal(str) {
    if (!str || typeof str !== 'string') return '';
    
    // 快速检查：是否包含短横线
    if (!str.includes('-')) {
        // 没有短横线，检查是否已经是PascalCase
        if (str.length > 0 && str[0] === str[0].toUpperCase()) {
            return str; // 已经是PascalCase
        }
        // 首字母大写（处理camelCase或全小写）
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    // 真正需要转换的情况
    return str
        .split('-')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
}

// import * as Icons from '@ant-design/icons-vue'
// // 图标
// const menuIcon = (icon) => {
//     return Icons[icon]
// }
</script>