// sequelize构造函数传递的配置项
mysql = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'monitor',
  charset: 'UTF8_GENERAL_CI', // 连接字符集
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = mysql;
