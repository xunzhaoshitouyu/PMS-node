/*
 * @Author: cc
 * @Date: 2020-04-27 17:24:27
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 17:37:32
 */
const Sequelize = require('sequelize');
const BasicModel = require('../../BasicModel');

class ServerResource extends BasicModel {}

ServerResource.init(
  {
    id: {
      type: Sequelize.STRING(40),
      field: 'id',
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    serverId: {
      type: Sequelize.STRING(40),
      field: 'server_id',
    },
    cpuOccupationRate: {
      type: Sequelize.FLOAT(3, 1),
      field: 'cpu_occupation_rate',
    },
    memoryOccupationRate: {
      type: Sequelize.FLOAT(3, 1),
      field: 'memory_occupation_rate',
    },
    hddOccupationRate: {
      type: Sequelize.JSON,
      field: 'hdd_occupation_rate',
    },
    services: {
      type: Sequelize.JSON,
      field: 'services',
    },
    tableSpace: {
      type: Sequelize.JSON,
      field: 'table_space',
    },
    createTime: {
      type: Sequelize.DATE,
      field: 'create_time',
      defaultValue: new Date(),
    },
  },
  { tableName: 'server_resource' }
);

module.exports = ServerResource;
