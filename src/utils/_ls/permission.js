// 权限
let permissionSet = new Set()

/**
 * 设置当前用户权限
 * @param {string[]} list
 */
export function setPermissions(list) {
  permissionSet = new Set(list || [])
}

/**
 * 权限校验
 * @param {string | string[] | { any?: string[], all?: string[] }} value
 */
export function hasPermission(value) {
  if (!value) return true

  // 单权限
  if (typeof value === 'string') {
    return permissionSet.has(value)
  }

  // 多权限（默认全部满足）
  if (Array.isArray(value)) {
    return value.every(p => permissionSet.has(p))
  }

  // 任意一个
  if (value.any) {
    return value.any.some(p => permissionSet.has(p))
  }

  // 全部满足
  if (value.all) {
    return value.all.every(p => permissionSet.has(p))
  }

  return false
}
