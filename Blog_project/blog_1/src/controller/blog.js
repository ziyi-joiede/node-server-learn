const getList = (author, keyword) => {
    // 先返回假数据,但是格式是正确的
    return [{
            id: 1,
            title: '标题 A',
            content: '内容 A',
            createTime: 1608946990213,
            author: '张三'
        },
        {
            id: 2,
            title: '标题 B',
            content: '内容 B',
            createTime: 1608947046405,
            author: '李四'
        }
    ]
}

const getDetail = (id) => {
    // 返回假数据
    return {
        id: 1,
        title: '标题 A',
        content: '内容 A',
        createTime: 1608946990213,
        author: '张三'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象包含 title content 属性
    return {
        id: 3, // 
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 为要更新一篇博客的 id
    // blogData 是一个博客对象包含 title content 属性

    return true;
}

const delBlog = (id) => {
    // id 就是演删除博客的 id
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}