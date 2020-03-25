const Sequelize = require("sequelize");
const sequelize = require("../connection");

const Model = Sequelize.Model;
class ServerGroup extends Model {}

/**
 * 服务器分组模型
 */
ServerGroup.init(
  {
    id: {
      type: Sequelize.STRING(40),
      field: "id",
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    serverGroupName: {
      // 分组名
      type: Sequelize.STRING(80), // 传参代表字符串的长度，不传参的话默认长度为255
      field: "server_group_name"
    },
    serverGroupDescription: {
      // 分组描述
      type: Sequelize.STRING(200),
      field: "server_group_description"
    },
    isDeleted: {
      // 删除标志位
      type: Sequelize.INTEGER,
      field: "is_deleted"
    },
    createTime: {
      // 添加时间
      type: Sequelize.DATE,
      field: "create_time",
      defaultValue: Sequelize.NOW // 默认当前时间
    }
  },
  { sequelize, tableName: "server_groups", createdAt: false, updatedAt: false } // modelName对应的是数据库中表名
);

module.exports = ServerGroup;
