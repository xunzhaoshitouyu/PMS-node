/*
 * @Author: cc
 * @Date: 2020-03-26 17:12:04
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 17:46:20
 */
const express = require('express');
const router = express.Router();

const ServerDao = require('../dao/serverDao');

// 根据条件获取服务器列表
router.post('/getServersByQuery', function (req, res) {
  ServerDao.getServersByQuery(req, res);
});

// 新增服务器
router.post('/insert', function (req, res) {
  ServerDao.add(req, res);
});

// 更新服务器
router.post('/update', function (req, res) {
  ServerDao.update(req, res);
});

// 删除服务器
router.post('/delete', function (req, res) {
  ServerDao.delete(req, res);
});

module.exports = router;
