const querystring = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 用于处理 postData
const getPostData = (req) => {
    return Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        });
    });
}

const serverHandle = (req, res) => {

    // console.log(req.headers);

    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];
    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    // 解析 postData
    getPostData(req)
        .then(data => {
            req.body = data;
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
        });


}




module.exports = serverHandle;

// env: process.env.NODE_ENV