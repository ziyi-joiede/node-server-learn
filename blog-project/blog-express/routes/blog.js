const express = require('express');
const router = express.Router();
const { 
	getList, 
	getDetail,
	newBlog,
	updateBlog,
	delBlog 
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')  

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
	const keyword = req.query.keyword || ''

	if(req.query.isadmin) {
		console.log('is admin')
		if(req.session.username === null) {
			console.error('is admin, but no login')
			// 未登录
			res.json(
				new ErrorModel('未登录')
			)
			return
		}
		author = req.session.username 
	}

	const result = getList(author, keyword)
	return result.then(listData => {
		res.json(
			new SuccessModel(listData)
		)
	})
});

router.get('/detail', (req, res, next) => {
	const result = getDetail(req.query.id)
	return result.then(data => {
		res.json(
			new SuccessModel(data[0])
		)
	})
})

router.post('/new', loginCheck, (req, res, next) => {
	const author = req.session.username
	req.body.author = author

	return newBlog(req.body).then(insertData => {
		
		res.json(
			new SuccessModel({
				id: insertData.insertId
			})
		)
	}).catch(err => {
		console.log(err);
	})
})

router.post('/update', loginCheck, (req, res, next) => {
	const result = updateBlog(req.query.id, req.body)
	return result.then(updateData => {
		if(updateData.affectedRows > 0)	{
			res.json(
				new SuccessModel('')
			)
		}
		else {
			res.json(
				new ErrorModel('更新博客失败')
			)
		}
	})
})

router.post('/del', (req, res, next) => {
	const author = req.session.username
	const result = delBlog(req.query.id, author)
		return result.then(delData => {
			if(delData.affectedRows > 0) {
				res.json(
					new SuccessModel()
				)
				return
			}
			res.json(
				new ErrorModel('删除博客失败!')
			)
		})
})

module.exports = router;
