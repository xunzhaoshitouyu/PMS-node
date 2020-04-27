/*
 * @Author: cc
 * @Date: 2020-04-01 13:28:53
 * @Last Modified by: cc
 * @Last Modified time: 2020-04-27 18:37:34
 */
const Sequelize = require('sequelize');
const sequelize = require('../modules/connection');
const Util = require('../utils/utils');
const Server = require('../modules/models/server/Server');
const serverGroup = require('../modules/models/server/ServerGroup');
const Service = require('../modules/models/server/Service');
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
                data_item: 'services',
              },
            },
          ],
        },
      ],
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
    // result = Util.responseHandler(data);
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);
}

/**
 * @description 新增服务器
 * @author cc
 * @param {*} req
 * @param {*} res
 */
async function add(req, res) {
  let result = {};
  try {
    let {
      serverName,
      serverGroupId,
      locationId,
      ipAddress,
      os,
      serverDescription,
    } = req.body;
    await Server.create({
      serverName: serverName,
      serverGroupId: serverGroupId,
      locationId: locationId,
      ipAddress: ipAddress,
      os: os,
      serverDescription: serverDescription,
    });
    result = Util.responseHandler('添加成功');
  } catch (error) {
    result = Util.errorHandler(error);
  }
  res.json(result);
}

/**
 * @description 更新服务器信息
 * @author cc
 * @param {*} req
 * @param {*} res
 */
async function updateById(req, res) {
  let result = {};
  try {
    let {
      id,
      serverName,
      serverGroupId,
      locationId,
      ipAddress,
      os,
      serverDescription,
    } = req.body;
    let [state] = await Server.update(
      {
        serverName: serverName,
        serverGroupId: serverGroupId,
        locationId: locationId,
        ipAddress: ipAddress,
        os: os,
        serverDescription: serverDescription,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (state) {
      result = Util.responseHandler('更新成功');
    } else {
      result = Util.errorHandler('更新失败', 400);
    }
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);
}

/**
 * @description 逻辑删除服务器
 * @author cc
 * @param {*} req
 * @param {*} res
 */
async function deleteById(req, res) {
  let result = {};
  try {
    let { id } = req.body;
    let [state] = await Server.update(
      {
        isDeleted: 1,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (state) {
      result = Util.responseHandler('删除成功');
    } else {
      result = Util.errorHandler('删除失败', 400);
    }
  } catch (error) {
    result = Util.errorHandler(error);
  }
  res.json(result);
}

/**
 * @description 根据id查询服务器详情
 * @author cc
 * @param {*} req
 * @param {*} res
 */
async function queryById(req, res) {
  let result = {};
  try {
    let { id } = req.query;
    if (id) {
      let [record] = await sequelize.query(
        'SELECT a.id,a.server_name AS serverName, a.server_description  AS serverDescription, a.ip_address AS ipAddress,a.os,b.server_group_name AS serverGroupName,c.cpu_occupation_rate AS cpuRate,c.memory_occupation_rate AS memoryRate,c.hdd_occupation_rate AS hddRate,c.services AS services,c.table_space AS tableSpace FROM servers a LEFT JOIN server_groups b ON a.server_group_id = b.id LEFT JOIN server_resource c ON a.id = c.server_id WHERE a.id = ?',
        {
          replacements: [id],
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      result = Util.responseHandler(record);
    } else {
      result = Util.errorHandler('查询出错', 404);
    }
  } catch (error) {
    result = Util.errorHandler(error);
  }

  res.json(result);
}

module.exports = {
  getServersByQuery,
  add,
  update: updateById,
  delete: deleteById,
  queryById,
};
