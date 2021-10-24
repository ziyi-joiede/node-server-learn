const { exec, escape } = require('../db/mysql')
const xss = require('xss')
/**
 * @description 获取博客列表
 * @param { string } author 博客作者 
 * @param { string } keyword 关键字
 * @returns 
 */
const getList = async (author, keyword) => {

	if(author) {
		author = escape(author)
	}
	if(keyword) {
		keyword = escape(keyword)
	}
	

	// 1=1 占位

	let sql = `select id, title, content, author from blogs where 1=1 `

	if(author) {
		sql += `and author=${author} `
	}

	if(keyword) {
		sql += `and title like %${keyword}% `
	}

	sql += `order by createtime desc;`

	// 返回 promise
	return await exec(sql)
}

/**
 * @description 获取博客详情
 * @param { string } id 博客的 id 
 * @returns 
 */
const getDetail = async id => {
	id = escape(id)

	// 先返回假数据
	// return {
	// 		id: '1',
	// 		title: '标题 A',
	// 		content: '内容 A',
	// 		createTime: 1633441214308,
	// 		author: 'zhangsan'
	// }

	let sql = `select * from blogs where id=${id}`

	return await exec(sql)
}

/**
 * @description 创建博客
 * @param { object } blogData 
 */
const newBlog = async (blogData = {}) => {
	// blogData 是一个博客对象, 包含 title, content, author 属性

	// return {
	// 	id: '3' // 表示新建博客, 插入到数据表里面的 id
	// }

	let { title, content, author } = blogData

	title = xss(escape(title))
	content = xss(escape(content))
	// console.log(title, content);
	author = xss(escape(author)) 
	// console.log(title, content, author);
	const createtime = Date.now() 

	let sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${createtime}, ${author});`


	return await exec(sql)
}

/**
 * @description 更新博客
 * @param { string } id 要更新博客的 id
 * @param { object } blogData 
 * @returns 
 */
const updateBlog = async (id, blogData = {}) => {
	// id 就是要更新博客的 id
	// blogData 是一个博客对象, 包含 title, content, author 属性

	// return true

	let { title, content } = blogData
	id = escape(id)
	title = xss(escape(title))
	content = xss(escape(content))

	let sql = `update blogs set title=${title}, content=${content} where id=${id}`

	return await exec(sql)
}

/**
 * @description 删除博客
 * @param { string } id 删除博客的 id
 * @returns 
 */
const delBlog = async (id, author) => {
	// id 就是要删除博客的 id
	// return true

	id = escape(id)

	let sql = `delete from blogs where id=${id} and author='${author}';`
	return await exec(sql)
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}