/*
 * @Author: cc
 * @Date: 2020-03-26 17:12:04
 * @Last Modified by: cc
 * @Last Modified time: 2020-03-26 17:18:49
 */
const express = require('express');
const router = express.Router();

// 根据条件获取服务器列表
router.get('/getServersByQuery', function(req, res) {
  res.send('获取服务器列表接口');
});

module.exports = router;
