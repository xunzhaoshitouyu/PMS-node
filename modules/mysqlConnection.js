// 原生连接mysql
const mysql = require('mysql');
const mysqlConfig = require('./config/mysql');

// 使用线程池，避免开太多的线程，提升性能
const pool = mysql.createPool(mysqlConfig);

/**
 * @description 对query执行的结果自定义返回json结果
 * @author cc
 * @param {*} res 响应体
 * @param {*} result 原始数据
 * @param {*} resultJSON json数据
 */
function responseDoReturn(res, result) {
  if (typeof result === 'undefined') {
    res.json({
      code: '201',
      msg: 'failed to do'
    });
  } else {
    res.json(result);
  }
}

/**
 * @description 封装query之sql带不占位符func
 * @author cc
 * @param {*} sql sql语句
 * @param {*} callback 回调方法
 */
function query(sql, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, function(err, rows) {
      callback(err, rows);
      // 释放链接
      connection.release();
    });
  });
}

/**
 * @description 封装query之带占位符func
 * @author cc
 * @param {*} sql sql语句
 * @param {*} args 占位符
 * @param {*} callback 回调方法
 */
function queryArgs(sql, args, callback) {
  pool.getConnection(function(err, connection) {
    connection.query(sql, args, function(err, rows) {
      callback(err, rows);
      // 释放链接
      connection.release();
    });
  });
}

module.exports = {
  query: query,
  queryArgs: queryArgs,
  doReturn: responseDoReturn
};
