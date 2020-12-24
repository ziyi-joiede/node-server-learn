const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: '这是获取博客列表的接口'
        }
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: '这是获取博客详情的接口'
        }
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: '这是获新建博客的接口'
        }
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '这是获更新博客的接口'
        }
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        return {
            msg: '这是获删除博客的接口'
        }
    }
};


module.exports = handleBlogRouter;