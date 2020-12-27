const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel.js');

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');



const handleBlogRouter = (req, res) => {
    const method = req.method; // GET POST
    const query = req.query;
    const id = req.query.id;

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {

        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData);

    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {

        const data = getDetail(id);
        return new SuccessModel(data);
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body;
        let data = newBlog(blogData)
        return new SuccessModel(data);
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        let res = updateBlog(id, req.body);
        if (res) {
            return new SuccessModel();
        } else {
            return new ErrorModel('更新博客失败!');
        }

    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('删除博客失败!');
        }
    }
};


module.exports = handleBlogRouter;