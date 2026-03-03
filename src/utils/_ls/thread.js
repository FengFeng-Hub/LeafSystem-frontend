/**
 * 休眠
 *
 * @param {*} ms 休眠时间，单位毫秒
 * @returns Promise
 */
export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
