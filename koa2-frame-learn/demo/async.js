// 演示 async/await 执行顺序
// (代码要放在浏览器中执行, 这里只是写完代码保存一下)

// 加载一张图片
async function getImg(url = '') {
	await fetch(url) // 加载图片
}

async function fn() {
	const url = 'https://i1.hdslb.com/bfs/face/390378430d95bc8732b25800615d7bd748010dd2.jpg@96w_96h_1c_1s.webp'

	const start = new Date() // 记录当前时间

	await getImg(url) // 调用加载图片
	const ms = Date.now() - start // 计算时间差
	console.log(`加载图片花费了 ${ms} 毫秒`)
}

// 1. fn 2. getImg(fn 还未执行结束) 3. 进入 fn

async function A() {
	await fn()
}

A()

