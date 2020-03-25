// sequelize构造函数传递的配置项
mysql = {
  host: "xxxx",
  user: "xxxx",
  password: "xxxx",
  port: "3306",
  database: "xxxx",
  charset: "UTF8_GENERAL_CI", // 连接字符集
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = mysql;
