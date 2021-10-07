const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
	// 先试用假数据
	// if(username === 'zhangsan' && password === '123') {
	// 	return true
	// }else {
	// 	return false
	// }

	let sql = `select username, realname from users where username='${username}' and password='${password}'`

	return exec(sql)

}

module.exports = {
	loginCheck
}