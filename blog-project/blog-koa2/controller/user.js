const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {

	username = escape(username)
	password = genPassword(password)
	password = escape(password)

	// 先试用假数据
	// if(username === 'zhangsan' && password === '123') {
	// 	return true
	// }else {
	// 	return false
	// }

	let sql = `select username, realname from users where username=${username} and password=${password}`

	return await exec(sql)

}

module.exports = {
	login
}