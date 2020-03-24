const express = require('express');
const router = express.Router();
const ServerGroupDao = require('../dao/serverGroupDao');

// 查询服务器分组信息
router.get('/getSGList', function(req, res, next) {
  ServerGroupDao.queryAllGroups(req, res);
});

module.exports = router;
