import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
    return {
		plugins: [vue()],
	    resolve: {
	        alias: {  // 这里就是需要配置resolve里的别名
	            "@": path.join(__dirname, "./src"), // path记得引入
	        }
	    },
	    // 服务器配置
	    server: {
	        // 代理配置
	        proxy: {
	            [env.VITE_APP_BASE_API]: {
	                target: 'http://127.0.0.1:8081',  // 后端服务器地址
	                changeOrigin: true,  // 改变源
					// 重写路径
	                rewrite: (path) => {
				      	// 移除 API 前缀
				      	if (path.startsWith(env.VITE_APP_BASE_API)) {
				      	  	return path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), '')
				      	}
				      	return path
				    },
	                // secure: false,  // 如果是 https 需要设为 false （如果目标服务器使用 HTTPS 但证书无效）
	            },
	            '/upload': {
	                target: 'http://127.0.0.1:8081',
	                changeOrigin: true,
	                // secure: false,
	            },
	        },
	    }
	}
})
