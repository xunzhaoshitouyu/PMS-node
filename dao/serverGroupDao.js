const SqlCommand = require('../modules/sqlCommand');

const ServerGroup = require('../modules/models/ServerGroup');

/**
 * @description 查询所有服务器分组，sequelize
 * @author cc
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
        'createTime'
      ]
    });
    result = {
      code: 200,
      msg: 'success',
      data: data
    };
  } catch (error) {
    result = {
      code: 500,
      msg: 'err:' + error,
      data: null
    };
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

module.exports = {
  queryAllGroups: queryAllGroups
};
