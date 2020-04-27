const SqlCommand = require('../modules/sqlCommand');

const Util = require('../utils/utils');
const ServerGroup = require('../modules/models/server/ServerGroup');

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
        'id',
        'serverGroupName',
        'serverGroupDescription',
        'isDeleted',
        'createTime',
      ],
      where: {
        isDeleted: 0,
      },
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
      throw new Error('serverGroupName不能为空');
    }
    let data = await ServerGroup.create({
      serverGroupName: serverGroupName,
      serverGroupDescription: serverGroupDescription,
      isDeleted: isDeleted,
    });
    result = Util.responseHandler('新增分组成功');
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);
}

/**
 * @description 删除分组
 * @author cc
 * @param {*} req 请求体
 * @param {*} res 响应体
 */
async function deleteGroup(req, res) {
  let result = {};
  let id;
  try {
    id = req.query.id;
    if (id) {
      result = Util.responseHandler(id);
      let state = await ServerGroup.update(
        { isDeleted: 1 },
        {
          where: {
            id: id,
          },
        }
      );
      if (state[0]) {
        result = Util.responseHandler('删除成功');
      } else {
        result = Util.errorHandler(
          '删除失败，请确认要删除的分组ID是否正确！',
          400
        );
      }
    } else {
      result = Util.errorHandler('id不能为空！', 400);
    }
  } catch (error) {
    result = Util.errorHandler(error);
  }
  res.json(result);
}

module.exports = {
  queryAllGroups: queryAllGroups,
  addGroup,
  deleteGroup,
};
