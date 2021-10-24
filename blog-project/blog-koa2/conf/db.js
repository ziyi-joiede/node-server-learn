const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if(env === 'dev'){
	// mysql
	MYSQL_CONF = {
		local: 'localhost',
		user: 'root',
		password: 'LIyongwei@314920',
		port: '3306',
		database: 'myblog'
	}

	// redis
	REDIS_CONF = {
		port: 6379,
		host: '127.0.0.1'
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

	// redis
	REDIS_CONF = {
		port: 6379,
		host: '127.0.0.1'
	}
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF
}