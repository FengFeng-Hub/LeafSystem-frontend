<template>
    <a-layout class="layout">
        <!-- 侧边栏 -->
        <a-layout-sider
            v-model:collapsed="collapsed"
            :theme="menuTheme"
            :trigger="null"
            collapsible
            :width="menuWidth"
            style="height: 100vh;left: 0;overflow: auto"
        >
            <div
				class="logo"
				:style="{
					borderBottom: menuTheme === 'light' ? '1px solid #e8e8e8':'none'
				}"
			>
                <img src="@/assets/vue.svg" alt="logo" style="height: 32px"/>
                <h1 v-if="!collapsed" class="logo-title"
					:style="{
						color: menuTheme === 'light' ? 'rgba(0, 0, 0, 0.85)':'#fff'
					}"
				>Leaf 管理系统</h1>
            </div>
            <a-menu
                mode="inline"
                :theme="menuTheme"
                :openKeys="openKeys"
                v-model:selectedKeys="selectedKeys"
				@openChange="handleOpenChange"
            >
                <AntdMenu
                    :data="menuTree"
                    :model="{
                        key: 'menu_id',
                        label: 'menu_name',
                        icon: 'menu_icon',
                        children: 'child_menu',
						hidden: (item) => item.is_show === '1',
                        isItem: (item) => item.type !== '1'
                    }"
                    @itemClick="handleMenuClick"
                />
            </a-menu>
        </a-layout-sider>

        <!-- 右侧区域 -->
        <a-layout
			:class="!isHeaderFixed ? 'scroll-y' : ''"
			:style="{ height: footerVisible ? `calc(100vh - 40px)` : '100vh' }">
            <!-- 右侧区域右侧顶部 -->
            <a-layout-header class="header">
                <!-- 右侧区域顶部左侧 -->
                <div class="header-left">
                    <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
                    <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)"/>
					<ReloadOutlined v-if="!enableMultiTab" class="trigger" @click.stop="handleRefresh" style="margin-left: 20px"/>
                    <!-- 面包屑 -->
                    <a-breadcrumb class="breadcrumb">
                        <a-breadcrumb-item>首页</a-breadcrumb-item>
                        <a-breadcrumb-item>首页</a-breadcrumb-item>
                        <a-breadcrumb-item>1</a-breadcrumb-item>
                    </a-breadcrumb>
                </div>
                <!-- 右侧区域顶部右侧 -->
                <div class="header-right">
                    <a-space :size="16">
                        <a-tooltip title="通知"><a-badge :count="5" dot><a-button type="text" shape="circle"><template #icon><BellOutlined/></template></a-button></a-badge></a-tooltip>

                        <a-dropdown>
                            <div class="user-avatar">
                                <a-avatar :size="32" :src="userInfo.avatar"/><span class="user-name">{{ userInfo.name }}</span>
                                <AntdIcon type="DownOutlined" style="margin-left: 8px"/>
                            </div>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="profile"><AntdIcon type="UserOutlined"/>个人中心</a-menu-item>
                                    <a-menu-item key="settings"><AntdIcon type="SettingOutlined"/>个人设置</a-menu-item>
                                    <a-menu-divider/>
                                    <a-menu-item key="logout"><AntdIcon type="LogoutOutlined"/>退出登录</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </a-space>
                	<a-tooltip title="系统设置"><a-button type="text" shape="circle" @click="rightDrawerOpen = true"><template #icon><SettingOutlined/></template></a-button></a-tooltip>
                </div>
            </a-layout-header>

            <!-- 内容区域 -->
            <a-layout-content
				:style="{ height: footerVisible ? `calc(100% - 40px)` : '100%' }"
			>
				<PageTabs
					v-if="enableMultiTab"
					ref="pageTabRef"
					v-model:keepAliveList="keepAliveList"
					@handleRefresh="handleRefresh"
				/>
                <!-- <router-view /> -->
				<LSContent
					:isHeaderFixed="isHeaderFixed"
					:enableMultiTab="enableMultiTab"
					:keepAliveList="keepAliveList"
				/>
            </a-layout-content>

            <!-- 页脚（高度小于等于0不显示） -->
            <div
				v-if="footerVisible"
				class="footer"
				:style="{
					width: `calc(100% - ${menuWidth}px)`,
					height: '40px',
				}"
			>© 2023 Leaf 管理系统</div>
        </a-layout>
		<LSRightDrawer
			v-model:open="rightDrawerOpen"
			v-model:menuTheme="menuTheme"
			v-model:menuWidth="menuWidth"
			v-model:isOnlyOpenCurrentMenu="isOnlyOpenCurrentMenu"
			v-model:isHeaderFixed="isHeaderFixed"
			v-model:enableMultiTab="enableMultiTab"
			v-model:footerVisible="footerVisible"
		/>
    </a-layout>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuTree } from '@/router/routes/backend'

// 组件
import { AntdMenu, AntdIcon }  from '@/components/_ls/ls-components'
import LSContent from './components/LSContent.vue'
import PageTabs from './components/LSPageTabs.vue'
import LSRightDrawer from './components/LSRightDrawer.vue'

// 样式
import '@/styles/backend/index.css'

// 是否首次加载
let isFrist = true

const route = useRoute()
const router = useRouter()

// 组件ref
const pageTabRef = ref()

// 响应式状态
const collapsed = ref(false)
const selectedKeys = ref([])
const openKeys = ref([])
const rightDrawerOpen = ref(false)
// 缓存页面的name列表，配合路由meta中的keepAlive属性使用
const keepAliveList = ref([])

// 配置
// 菜单主题
const menuTheme = ref('dark')
// 菜单宽度
const menuWidth = ref(210)
// 是否只展开当前菜单
const isOnlyOpenCurrentMenu = ref(true)
// 固定头部
const isHeaderFixed = ref(true)
// 启动多页签
const enableMultiTab = ref(true)
// 显示页脚
const footerVisible = ref(true)

// 用户信息
const userInfo = ref({
    name: 'Admin User',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
})

// 初始化
onMounted(() => {})

// 菜单变化
watch(
	() => route.meta.key,
	async (newKey, a) => {
		// 如果不是后台页面直接返回
		if (!route.meta.isBackend) return
	    selectedKeys.value = [newKey]

		await nextTick()

		// 首次加载
		if (isFrist) {
			// 设置打开的父菜单
			handleSetMenuOpenKeys(newKey)
			isFrist = false
		}

		// 添加标签页
		if (enableMultiTab.value && pageTabRef.value) {
			pageTabRef.value.addTab(newKey)
		}

		// 添加页面缓存
		if (route.meta.pageCache && route.name) {
	      	if (!keepAliveList.value.includes(route.name)) {
	        	keepAliveList.value.push(route.name)
	      	}
	    }
	},
	{ immediate: true } // 立即触发回调
)

// 菜单点击
const handleMenuClick = (item) => {
	switch (item.type) {
		// 菜单项 / iframe
		case '2':
		case '3':
			const queryString = item.url.split('?')[1] || ''
			const params = Object.fromEntries(new URLSearchParams(queryString))

		    router.push({
		        path: item.url,
				query: params
		    })
			break
		// 此页面
		case '4':
			location.href = item.link
			break
		// 新页面
		case '5':
			window.open(item.link, "_blank")
			break
	}
}

// 菜单展开变化
const handleOpenChange = (keys) => {
	if (isOnlyOpenCurrentMenu.value) {
		const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1)
		console.log(latestOpenKey)

		if (latestOpenKey) {
			handleSetMenuOpenKeys(latestOpenKey)
		} else {
			openKeys.value = keys
		}
	}
}

// 设置打开的父菜单
const handleSetMenuOpenKeys = (menuId) => {
    const findParentKeys = (menus, id, parentKeys = []) => {
        for (const menu of menus) {
            if (menu.menu_id === id) {
                return parentKeys
            }
            if (menu.child_menu && menu.child_menu.length) {
                const found = findParentKeys(menu.child_menu, id, [...parentKeys, menu.menu_id])
                if (found) return found;
            }
        }
        return null
    }

    if (menuId) {
        openKeys.value = [...findParentKeys(menuTree, menuId), menuId] || []
    }
}

// 刷新
const handleRefresh = () => {
	// 先清除当前缓存
	keepAliveList.value = keepAliveList.value.filter(name => name !== route.name)

	// 当前url
	const currentUrl = route.meta.url
	router.replace({
        path: '/backend/ls-redirect' + currentUrl,
		query: route.query
    })
}
</script>

<style scoped>
.layout {
    min-height: 100vh;
}

.logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-title {
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
}

.header {
    background: white;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 1;
    height: 60px;
}

.header-left {
    display: flex;
    align-items: center;
}

.trigger {
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s;
}

.breadcrumb {
    margin-left: 16px;
}

.header-right {
    display: flex;
    align-items: center;
}

.footer {
    padding: 10px 0;
	position: fixed;
	bottom: 0;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}

.user-avatar {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.3s;
}

.user-name {
    margin-left: 8px;
}
</style>
