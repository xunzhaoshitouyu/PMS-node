const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Model = Sequelize.Model;

// 定义basicModel，统一设置createdAt，updatedAt为false，这样就不用在每个model里都添加这个配置项了
class BasicModel extends Model {
  static init(attr, options) {
    super.init(attr, {
      ...options,
      sequelize,
      createdAt: false,
      updatedAt: false
    });
  }
}

module.exports = BasicModel;
