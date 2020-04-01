// sequelize构造函数传递的配置项
mysql = {
  host: '172.30.1.19',
  user: 'Samuel',
  password: '1qaz@WSX',
  port: '3306',
  database: 'monitor',
  charset: 'UTF8_GENERAL_CI', // 连接字符集
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = mysql;
