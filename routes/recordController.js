/*
 * @Author: cc
 * @Date: 2020-04-27 17:45:34
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 17:57:12
 */
const express = require('express');
const router = express.Router();

const ServerDao = require('../dao/serverDao');

// 根据id查询服务器信息
router.get('/getLatestResourcesById', function (req, res) {
  ServerDao.queryById(req, res);
});

module.exports = router;
