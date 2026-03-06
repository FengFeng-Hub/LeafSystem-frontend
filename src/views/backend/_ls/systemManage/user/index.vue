<template>
    <div class="container">
		<!-- 搜索区域 -->
        <a-row :gutter="20">
            <a-col>
                <a-input-group compact style="width: 400px;">
                    <a-select v-model:value="searchConfig.field" style="width: 30%;">
                        <a-select-option value="user_id">用户代码</a-select-option>
        				<a-select-option value="name">名称</a-select-option>
        				<a-select-option value="account">账号</a-select-option>
        				<a-select-option value="phone">手机号</a-select-option>
        				<a-select-option value="email">电子邮箱</a-select-option>
        				<a-select-option value="real_name">真实姓名</a-select-option>
        				<a-select-option value="idcard">身份证号</a-select-option>
                    </a-select>
                    <a-select v-model:value="searchConfig.IsEquals" style="width: 18%;">
                        <a-select-option value="0">包含</a-select-option>
                        <a-select-option value="1">等于</a-select-option>
                    </a-select>
                    <a-input v-model:value="searchConfig.searchKey" style="width: 50%"/>
                </a-input-group>
            </a-col>
            <a-col>
                <a-form-item label="禁用">
                    <a-select v-model:value="searchConfig.model.is_disable" allowClear style="width: 80px">
        				<a-select-option value="1">是</a-select-option>
        				<a-select-option value="0">否</a-select-option>
        			</a-select>
                </a-form-item>
            </a-col>
            <a-col>
                <a-form-item label="角色">
                    <a-select
        				mode="multiple"
        				v-model:value="roleSelected"
        				placeholder="请选择角色"
        				@search="handleRoleSearch"
                        @change="handleRoleChange"
        				:filter-option="false"
                        style="width: 200px"
        			>
        				<a-select-option
        					v-for="item in roleData"
        					:key="item.role_id"
        					:value="item.role_id"
                            :label="item.role_name"
        				>
        					{{ item.role_id }} - {{ item.role_name }}
        				</a-select-option>
        			</a-select>
                </a-form-item>
            </a-col>
            <a-col>
                <a-button type="primary" @click="handleSearch" :loading="loading"><template #icon><SearchOutlined/></template>搜索</a-button>
		        <a-button @click="handleReset" style="margin-left: 10px"><template #icon><ReloadOutlined/></template>重置</a-button>
            </a-col>
        </a-row>

		<!-- 操作区域 -->
        <LSTableOperator
			enableRefresh
			enableFullScreen
			enableColumnDisplay
			:btnRightSize="'small'"
			v-model:tableColumnsConfig="tableColumnsConfig"
			@handleRefresh="loadList"
		>
            <template #btnGroup>
                <a-button type="primary" class="btn-operator" @click="handleEdit(null, 'add')" v-permission.disable="'lspk:ls:timedTaskLog:list1'"><PlusOutlined/>新建</a-button>
			<a-button class="btn-operator"><DeleteOutlined/>批量删除</a-button>
            </template>
        </LSTableOperator>

		<!-- 表格区域 -->
        <a-table
            bordered
            size="small"
            :columns="tableColumns"
            :data-source="tableData"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :scroll="{ x: 'max-content' }"
        >
            <template #bodyCell="{ column: { key, dataIndex }, record }">
                <template v-if="key === 'action'">
                    <a-button type="link" size="small" title="查看" @click="handleEdit(record.user_id, 'view')"><EyeOutlined/></a-button>
        			<a-button type="link" size="small" title="编辑" @click="handleEdit(record.user_id, 'update')"><EditOutlined/></a-button>
        			<a-popconfirm title="确定删除该项？" @confirm="edit(record.user_id,'Delete')" @cancel="" ok-text="确定" cancel-text="取消">
        				<a-button type="link" size="small" title="删除" style="color: #f5222d;"><DeleteOutlined/></a-button>
        			</a-popconfirm>
        			<a-button type="link" size="small" title="重置密码" @click="handleShowResetPwdModal(record.user_id)">[重置密码]</a-button>
                </template>
                <template v-else-if="dataIndex === 'avatar'">
                    <a-avatar v-if="record.avatar" :size="32" :src="record.avatar"/>
                </template>
                <template v-else-if="dataIndex === 'sex'">
                    <a-tag v-if="record.sex == '1'" color="blue"><AntdIcon type="ManOutlined"/></a-tag>
        			<a-tag v-else-if="record.sex == '2'" color="red"><AntdIcon type="WomanOutlined"/></a-tag>
        			<template v-else color="gray">未知</template>
                </template>
                <template v-else-if="dataIndex === 'role_list'">
                    {{ record.role_list.map(item => item.role_name).join(' | ') }}
                </template>
            </template>
        </a-table>
    </div>
	<Edit
		:id="currentId"
		:type="editType"
		enableDrag
		v-model:open="editOpen"
	/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'

// 表格配置
import { tableColumns, tableColumnsConfig } from './js/config'

// 接口
import { getPage } from '@/api/__mock__/backend/_ls/systemManage/user'
import { getPage as getRolePage } from '@/api/__mock__/backend/_ls/systemManage/role'

// 组件
import { AntdIcon, LSTableOperator } from '@/components/_ls/ls-components'
import Edit from './components/Edit.vue'

// 组件显示开关
const editOpen = ref(false)

// 加载
const loading = ref(false)

// 当前id
const currentId = ref()
// 编辑页类型
const editType = ref('view')

// 分页
const pagination = ref({
    current: 1,                // 当前页码
  	pageSize: 10,               // 每页条数
  	total: 0,                   // 数据总数
  	showSizeChanger: true,      // 是否显示 pageSize 切换器
  	showQuickJumper: true,      // 是否显示快速跳转
  	pageSizeOptions: ['10', '20', '30', '50'], // 指定每页可以显示多少条
  	showTotal: (total, range) => `共 ${total} 条，当前显示 ${range[0]}-${range[1]} 条`, // 显示总数
  	defaultPageSize: 10,        // 默认的每页条数
  	position: ['bottomRight'],  // 指定分页显示的位置，可选值：'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
  	size: 'default',            // 可选 'default' 或 'small'
  	simple: false,              // 是否展示为简单分页
  	hideOnSinglePage: false,    // 只有一页时是否隐藏分页器
  	showLessItems: false,       // 是否显示较少的页面数量
})

// 搜索条件
const getSearchConfig = () => ({
    // 搜索字段
    field: 'name',
    // 搜索关键字
    searchKey: '',
    // 是否等于
    IsEquals: '0',
    model: {},
})
const searchConfig = ref(getSearchConfig())

// 表格数据
const tableData = ref([])
// 角色数据
const roleData = ref([])
// 选中角色id
const roleSelected = ref([])
// 选中角色对象
const roleSelectedObj = ref([])

// 初始化
onMounted(() => {
    loadList()
    loadRole()
})

// 加载表格数据
const loadList = async () => {
    loading.value = true
    const params = {
        IsEquals: searchConfig.value.IsEquals,
        ...searchConfig.value.model,
        ...{
            PageNo: pagination.value.current,
            PageCount: pagination.value.pageSize,
        },
    }
    params[searchConfig.value.field] = searchConfig.value.searchKey

    if (roleSelected.value && roleSelected.value.length > 0) {
        params.role_id_arr = roleSelected.value.join(',')
    }

    const resp = await getPage(params)

    if (resp.IsSuccess !== '1') {
        message.error(resp.Msg)
        return
    }

    loading.value = false
    pagination.value.total = resp.Count ? Number(resp.Count) : 0
    tableData.value = resp.data
}

// 加载角色
// 加载角色
const loadRole = async (searchKey) => {
    const resp = await getRolePage({
        PageNo: 1,
        PageCount: 5,
        role_id: searchKey,
        role_name: searchKey
    })

    if (resp.IsSuccess !== '1') {
        message.error(resp.Msg)
        return
    }

    roleData.value = resp.data;

    // 选择了但是未加载的角色
    const roleSelectedNotLoad = roleSelectedObj.value.filter(item =>
        !roleData.value.some(role => role.role_id === item.role_id)
    )
    roleData.value = [...roleSelectedNotLoad, ...roleData.value]
}

// 搜索角色
const handleRoleSearch = (key) => {
    console.log(key)
    loadRole(key)
}

// 角色 Change
const handleRoleChange = (value, model) => {
    roleSelectedObj.value = model.map(
        item => {
            return {
                role_id: item.key,
                role_name: item.label,
            }
        }
    )
    console.log(roleSelectedObj.value)
}

// 搜索
const handleSearch = () => {
    loadList()
}

// 添加
const handleEdit = (id, type) => {
	currentId.value = id
	editType.value = type
	editOpen.value = true
}

// 重置
const handleReset = () => {
    searchConfig.value = getSearchConfig()
    pagination.value.current = 1
    pagination.value.pageSize = 10

    roleSelected.value = []
    roleSelectedObj.value = []

    loadList()
}

// 修改分页
const handleTableChange = (val) => {
    pagination.value.current = val.current
    pagination.value.pageSize = val.pageSize
	loadList()
}
</script>

<style scoped>
.container {
    margin: 5px 5px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
}
</style>
