/*
 * @Author: cc
 * @Date: 2020-04-01 15:57:10
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 17:20:06
 * @desc 服务模型
 */

const Sequelize = require('sequelize');
// 基本模型
const BasicModel = require('../../BasicModel');
// 引入server,与serverGroup做关联，server隶属于serverGroup
class Service extends BasicModel {}

Service.init(
  {
    itemValue: {
      type: Sequelize.STRING(800),
      field: 'item_value',
    },
    create_time: {
      type: Sequelize.DATE,
      field: 'create_time',
    },
  },
  { tableName: 'record' }
);

module.exports = Service;
