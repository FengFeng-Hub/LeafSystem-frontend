import { hasPermission } from '@/utils/_ls/permission'

// 控件权限验证指令
// v-permission.disable → 禁用
// 默认：移除元素
export default {
  mounted(el, binding) {
    const { value, modifiers } = binding
    const hasAuth = hasPermission(value)
	console.log('判断权限 => ', value, hasAuth)

    if (!hasAuth) {
      if (modifiers && modifiers.disable) {
        el.disabled = true
        el.classList.add('is-disabled')
        el.style.pointerEvents = 'none'
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}
