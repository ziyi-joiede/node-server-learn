const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];


    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res);

    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        );
        return;
    }

    // 处理 user 路由
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(
            JSON.stringify(userData)
        );
        return;
    }

    // 未命中路由,返回 404
    res.writeHead(404, { 'Content-Type': 'text/pain' });
    res.write('404 Not Found\n')
    res.end();
    // 测试数据
    // const resData = {
    //     name: '子一100',
    //     site: 'www.bytedance.com',
    //     env: process.env.NODE_ENV
    // };
}




module.exports = serverHandle;

// env: process.env.NODE_ENV