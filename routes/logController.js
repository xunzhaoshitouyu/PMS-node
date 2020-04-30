/*
 * @Author: cc 
 * @Date: 2020-04-29 13:44:37 
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-30 13:23:44
 */
const express = require("express");
const router = express.Router();
const logDao = require("../dao/logDao");

router.post("/getPageByQuery", function(req,res) {
    logDao.queryLogByPage(req,res);
});

module.exports = router;