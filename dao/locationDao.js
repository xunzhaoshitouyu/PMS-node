/*
 * @Author: cc 
 * @Date: 2020-04-29 13:18:32 
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-30 13:21:11
 */
const Sequelize = require("sequelize");
const Util = require("../utils/utils");
const Location = require("../modules/models/location/Location");


/**
 * @description 获取位置列表
 * @author cc
 * @param {*} req
 * @param {*} res
 */
async function getLocationList(req,res) {
    let result = {};
    try {
        let data = await Location.findAll({
            where:{
                isDeleted:0
            }
        })
        result = Util.responseHandler(data);
    } catch (error) {
        result = Util.errorHandler(error);
    }

    res.json(result);
}

module.exports = {
    getLocationList
}