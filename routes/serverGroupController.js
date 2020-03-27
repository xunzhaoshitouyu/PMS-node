/*
 * @Author: cc
 * @Date: 2020-03-26 17:10:58
 * @Last Modified by:   cc
 * @Last Modified time: 2020-03-26 17:10:58
 */

const express = require('express');
const router = express.Router();
const ServerGroupDao = require('../dao/serverGroupDao');

// 查询服务器分组信息
router.get('/getSGList', function(req, res, next) {
  ServerGroupDao.queryAllGroups(req, res);
});

// 新增分组
// 查询服务器分组信息
router.post('/insert', function(req, res, next) {
  ServerGroupDao.addGroup(req, res);
});

module.exports = router;
