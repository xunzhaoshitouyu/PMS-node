/*
 * @Author: cc
 * @Date: 2020-04-01 13:28:53
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-01 17:42:36
 */
const Sequelize = require('sequelize');
const Util = require('../utils/utils');
const Server = require('../modules/models/Server');
const serverGroup = require('../modules/models/ServerGroup');
const Service = require('../modules/models/Service');
// 查询连接符
const Op = Sequelize.Op;

/**
 * @description 根据条件查询服务器列表信息
 * @author cc
 */
async function getServersByQuery(req, res) {
  let result = {};
  try {
    let { serverGroupId, serverName, ipAddress } = req.body;
    const data = await serverGroup.findAll({
      attributes: [['id', 'serverGroupId'], 'serverGroupName'],
      where: Sequelize.and(
        serverGroupId ? { id: serverGroupId } : null
        // 1.1将关联表的条件提上来
        // serverName ? { '$servers.server_name$': serverName } : null
      ),
      include: [
        {
          model: Server,
          as: 'servers',
          // 在关联表位置进行关联查询
          where: Sequelize.and(
            // 服务器名
            serverName
              ? { server_name: { [Op.like]: `%${serverName}%` } }
              : null,
            // ip地址
            ipAddress ? { ip_address: ipAddress } : null
          ),
          include: [
            {
              model: Service,
              as: 'services',
              // attributes: ['itemValue'],
              where: {
                data_item: 'services'
              }
            }
          ]
        }
      ]
    });
    result = Util.responseHandler(data);
    // let data = await serverGroup.findAll({
    //   attributes: [
    //     'id',
    //     'serverGroupName',
    //     'serverGroupDescription',
    //     'isDeleted',
    //     'createTime'
    //   ]
    // });
    result = Util.responseHandler(data);
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);
}

module.exports = {
  getServersByQuery
};
