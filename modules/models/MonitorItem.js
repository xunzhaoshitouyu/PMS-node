const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Model = Sequelize.Model;

class MonitorItem extends Model {}

MonitorItem.init(
  {
    serverGroupId: {
      type: Sequelize.STRING(40),
      field: 'server_group_id'
    },
    monitorItem: {
      type: Sequelize.STRING(80),
      field: 'monitor_item'
    },
    monitorItemName: {
      type: Sequelize.STRING(200),
      field: 'monitor_item_name'
    }
  },
  { sequelize, modelName: 'monitor_items1' }
);

module.exports = MonitorItem;
