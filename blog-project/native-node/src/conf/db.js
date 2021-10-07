const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF

if(env === 'dev'){
	MYSQL_CONF = {
		local: 'localhost',
		user: 'root',
		password: 'LIyongwei@314920',
		port: '3306',
		database: 'myblog'
	}
}

if(env === 'production'){
	MYSQL_CONF = {
		local: 'localhost',
		user: 'root',
		password: 'LIyongwei@314920',
		port: '3306',
		database: 'myblog'
	}
}

module.exports = {
	MYSQL_CONF
}