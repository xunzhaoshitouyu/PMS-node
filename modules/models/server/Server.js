/*
 * @Author: cc
 * @Date: 2020-04-01 15:57:43
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 17:33:29
 * @desc 服务器模型
 */

const Sequelize = require('sequelize');

const BasicModel = require('../../BasicModel');
const Service = require('./Service');
class Server extends BasicModel {}

Server.init(
  {
    id: {
      type: Sequelize.STRING(40),
      field: 'id',
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    serverName: {
      type: Sequelize.STRING(80),
      field: 'server_name',
    },
    serverGroupId: {
      type: Sequelize.STRING(40),
      field: 'server_group_id',
    },
    serverDescription: {
      type: Sequelize.STRING(255),
      field: 'server_description',
    },
    ipAddress: {
      type: Sequelize.STRING(40),
      field: 'ip_address',
    },
    os: {
      type: Sequelize.STRING(200),
      field: 'os',
    },
    apiAddress: {
      type: Sequelize.STRING(255),
      field: 'api_address',
    },
    transmissionApiAddress: {
      type: Sequelize.STRING(255),
      field: 'transmission_api_address',
    },
    locationId: {
      type: Sequelize.STRING(40),
      field: 'location_id',
    },
    isDeleted: {
      type: Sequelize.INTEGER(1),
      field: 'is_deleted',
      defaultValue: 0,
    },
    createTime: {
      type: Sequelize.DATE,
      field: 'create_time',
      defaultValue: new Date(),
    },
    updateTime: {
      type: Sequelize.DATE,
      field: 'update_time',
      defaultValue: new Date(),
    },
  },
  { tableName: 'servers' }
);

Server.hasOne(Service, { as: 'services', foreignKey: 'server_id' });

module.exports = Server;
