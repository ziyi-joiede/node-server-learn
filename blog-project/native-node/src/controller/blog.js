/**
 * @description 获取博客列表
 * @param { string } author 博客作者 
 * @param { string } keyword 关键字
 * @returns 
 */
const getList = (author, keyword) => {
	// 先返回假数据 (格式是正确的)
	return [
		{
			id: '1',
			title: '标题 A',
			content: '内容 A',
			createTime: 1633441214308,
			author: 'zhangsan'
		},
		{
			id: '2',
			title: '标题 B',
			content: '内容 B',
			createTime: 1633441245276,
			author: 'lisi'
		}
	]
}

/**
 * @description 获取博客详情
 * @param { string } id 博客的 id 
 * @returns 
 */
const getDetail = id => {
	// 先返回假数据
	return {
			id: '1',
			title: '标题 A',
			content: '内容 A',
			createTime: 1633441214308,
			author: 'zhangsan'
	}
}

/**
 * @description 创建博客
 * @param { object } blogData 
 */
const newBlog = (blogData = {}) => {
	// blogData 是一个博客对象, 包含 title, content 属性

	return {
		id: '3' // 表示新建博客, 插入到数据表里面的 id
	}
}

/**
 * @description 更新博客
 * @param { string } id 要更新博客的 id
 * @param { object } blogData 
 * @returns 
 */
const updateBlog = (id, blogData = {}) => {
	// id 就是要更新博客的 id
	// blogData 是一个博客对象, 包含 title, content 属性

	return  false
}

/**
 * @description 删除博客
 * @param { string } id 删除博客的 id
 * @returns 
 */
const delBlog = id => {
	// id 就是要删除博客的 id
	return true
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
}