/*
 * @Author: cc
 * @Date: 2020-04-01 15:58:03
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 17:20:06
 * @desc 服务器分组模型
 */

const Sequelize = require('sequelize');
// 基本模型
const BasicModel = require('../../BasicModel');
// 引入server,与serverGroup做关联，server隶属于serverGroup
const Server = require('./Server');
class ServerGroup extends BasicModel {}

ServerGroup.init(
  {
    id: {
      type: Sequelize.STRING(40),
      field: 'id',
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    serverGroupName: {
      // 分组名
      type: Sequelize.STRING(80), // 传参代表字符串的长度，不传参的话默认长度为255
      field: 'server_group_name',
    },
    serverGroupDescription: {
      // 分组描述
      type: Sequelize.STRING(200),
      field: 'server_group_description',
    },
    isDeleted: {
      // 删除标志位
      type: Sequelize.INTEGER,
      field: 'is_deleted',
    },
    createTime: {
      // 添加时间
      type: Sequelize.DATE,
      field: 'create_time',
      defaultValue: Sequelize.NOW, // 默认当前时间
    },
  },
  { tableName: 'server_groups' } // modelName对应的是数据库中表名
);

ServerGroup.hasMany(Server, { as: 'servers', foreignKey: 'server_group_id' });

module.exports = ServerGroup;
