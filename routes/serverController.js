/*
 * @Author: cc
 * @Date: 2020-03-26 17:12:04
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-01 15:05:25
 */
const express = require('express');
const router = express.Router();

const ServerDao = require('../dao/serverDao');

// 根据条件获取服务器列表
router.post('/getServersByQuery', function(req, res) {
  ServerDao.getServersByQuery(req, res);
});

// 新增服务器
router.post('/insert', function(req, res) {
  res.send('获取服务器列表接口');
});

// 更新服务器
router.post('/update', function(req, res) {
  res.send('获取服务器列表接口');
});

// 删除服务器
router.post('/delete', function(req, res) {
  res.send('获取服务器列表接口');
});

// 根据id查询服务器信息
router.get('/getLatestResourcesById', function(req, res) {
  res.send('获取服务器列表接口');
});

module.exports = router;
