import { sleep } from '@/utils/_ls/thread'
import { data } from './userData'

export const getPage = async (params) => {
	await sleep(500)

	// 计算起始索引和结束索引
  	const start = (params.PageNo - 1) * params.PageCount
	const end = start + params.PageCount

	return {
	    "data": data.slice(start, end),
	    "IsSuccess": "1",
	    "Msg": null,
	    "Count": data.length,
	    "Code": null
	}
}
