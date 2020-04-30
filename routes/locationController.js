/*
 * @Author: cc 
 * @Date: 2020-04-29 13:18:28 
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-29 13:25:56
 */

const express = require("express");
const router = express.Router();
const LocationDao = require("../dao/locationDao");

router.get("/getLocationList",function (req,res) {
    LocationDao.getLocationList(req,res);
})

module.exports = router;