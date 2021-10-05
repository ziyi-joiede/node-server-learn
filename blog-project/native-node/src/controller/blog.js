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

module.exports = {
	getList
}