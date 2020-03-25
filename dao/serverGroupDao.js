const SqlCommand = require("../modules/sqlCommand");

const Util = require("../utils/utils");
const ServerGroup = require("../modules/models/ServerGroup");

/**
 * @description 查询所有服务器分组，sequelize
 * @author cc
 * @param {*} req 请求体
 * @param {*} res 响应体
 */
async function queryAllGroups(req, res) {
  let result = {};
  try {
    let data = await ServerGroup.findAll({
      attributes: [
        "id",
        "serverGroupName",
        "serverGroupDescription",
        "isDeleted",
        "createTime"
      ]
    });
    result = Util.responseHandler(data);
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);

  /**
   * 原生mysql查询
   */

  // query(SqlCommand.ServerGroup.selectAll,function(err, rows) {
  //     if (!err) {
  //         result = {
  //             code:200,
  //             msg:"success",
  //             data:rows
  //         }
  //     } else {
  //         result = {
  //             code:201,
  //             msg:"err:"+err
  //         }
  //     }
  //     res.json(result);
  // })
}

/**
 * @description 添加分组信息
 * @author cc
 * @param {*} req 请求体
 * @param {*} res 响应体
 */
async function addGroup(req, res) {
  let result = {};
  try {
    let serverGroupName, serverGroupDescription, isDeleted;
    if (req.body.serverGroupName) {
      serverGroupName = req.body.serverGroupName;
      serverGroupDescription = req.body.serverGroupDescription;
      isDeleted = req.body.isDeleted;
    } else {
      throw new Error("serverGroupName不能为空");
    }
    let data = await ServerGroup.create({
      serverGroupName: serverGroupName,
      serverGroupDescription: serverGroupDescription,
      isDeleted: isDeleted
    });
    result = Util.responseHandler("新增分组成功");
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);
}

module.exports = {
  queryAllGroups: queryAllGroups,
  addGroup
};
