/*
 * @Author: cc 
 * @Date: 2020-04-29 13:48:08 
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-30 16:49:56
 */

 const Sequelize = require("sequelize");
 const sequelize = require('../modules/connection');
 const Util = require("../utils/utils");
 const Log = require("../modules/models/log/Log");

 /**
  * @description 查询日志数据的分页接口
  * @author cc
  * @param {*} req
  * @param {*} res
  */
 async function queryLogByPage(req,res) {
     let result = {};
     try {
         let {currentPageNum,rowOfPage,param} = req.body;
         if(param.intervalType) { // 这个参数表示近1小时，近6小时，近12小时，近24小时，近1周，近2月，代码分别为1,2,3,4,5,6
            [param.startTime,param.endTime]=Util.getDateRange(param.intervalType);
         }
        //  总条数
        let [count] = await sequelize.query(
             `SELECT COUNT(a.id) as total
             FROM server_log a 
             LEFT JOIN servers b ON a.server_id = b.id 
             LEFT JOIN server_groups c ON b.server_group_id=c.id 
             WHERE 1=1
             ${param.serverId?'AND a.server_id = '+"'"+param.serverId+"'":''}
             ${param.serverGroupId?'AND b.server_group_id = '+"'"+param.serverGroupId+"'":''}
               ${param.serverName?'AND b.server_name = '+"'"+param.serverName+"'":''}
               ${param.ipAddress?'AND b.ip_address = '+"'"+param.ipAddress+"'":''}
               ${param.startTime?'AND a.create_time >= '+"'"+param.startTime+"'":''}
               ${param.endTime?'AND a.create_time < '+"'"+param.endTime+"'":''}`,
               {
          type: Sequelize.QueryTypes.SELECT
        }
         )
        //  分页数据
         let list = await sequelize.query(
             `SELECT a.id AS id,a.content AS content,a.source AS source,a.create_time AS createTime,a.level AS LEVEL,a.server_id AS serverId,b.server_name AS serverName,b.server_group_id AS serverGroupId,c.server_group_name AS serverGroupName,b.ip_address AS ipAddress 
             FROM server_log a 
             LEFT JOIN servers b ON a.server_id = b.id 
             LEFT JOIN server_groups c ON b.server_group_id=c.id 
             WHERE 1=1
             ${param.serverGroupId?'AND b.server_group_id = '+param.serverGroupId:''}
               ${param.serverName?'AND b.server_name = '+param.serverName:''}
               ${param.ipAddress?'AND b.ip_address = '+param.ipAddress:''}
               ${param.startTime?'AND a.create_time >= '+"'"+param.startTime+"'":''}
               ${param.endTime?'AND a.create_time < '+"'"+param.endTime+"'":''}
               LIMIT ${(currentPageNum-1)*rowOfPage},${rowOfPage}`,
               {
          type: Sequelize.QueryTypes.SELECT
        }
         )
        //  let data = await Log.findAll({
        //      where:{
        //          serverId:param.serverId,

        //      }
        //  });
        let data = {
            list:list,
            total:count.total
        }
         result = Util.responseHandler(data);
     } catch (error) {
         result = Util.errorHandler(error);
     }

     res.json(result);
 }

 module.exports = {
     queryLogByPage
 }