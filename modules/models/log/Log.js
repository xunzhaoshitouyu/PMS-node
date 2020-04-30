/*
 * @Author: cc 
 * @Date: 2020-04-29 13:56:11 
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-30 13:24:18
 * @desc 日志模型 
 */
const Sequelize = require("sequelize");
const BasicModel = require("../../BasicModel");

class Log extends BasicModel {};

Log.init({
        id: {
      type: Sequelize.STRING(40),
      field: 'id',
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    serverId:{
        type:Sequelize.STRING(40),
        field:"server_id"
    },
    source:{
        type:Sequelize.STRING(200),
        field:"source"
    },
    level:{
        type:Sequelize.STRING(10),
        field:"level"
    },
    content:{
        type:Sequelize.TEXT,
        field:"content"
    },
        createTime: {
      type: Sequelize.DATE,
      field: 'create_time',
      defaultValue: new Date(),
    },
},{tableName:"server_log"});

module.exports = Log;