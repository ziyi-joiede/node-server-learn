const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
	local: 'localhost',
	user: 'root',
	password: 'LIyongwei@314920',
	port: '3306',
	database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
// const sql = 'select * from users;'
// const sql = `update users set realname='李四' where username='lisi'`

const sql = `insert into blogs (title, content, createtime, author) values ('标题 C', '内容 C', 1633531619749, 'lisi');`
con.query(sql, (err, result) => {
	if(err) {
		console.log(err)
		return
	}
	console.log(result)
}) 

// 关闭连接
con.end()