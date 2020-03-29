const Sequelize = require("sequelize");
const mysqlConfig = require("./config/mysql");
const chalk = require("chalk");
const log = console.log;

const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// 测试链接
sequelize
  .authenticate()
  .then(() => {
    log(chalk.green("Connection has been established successfully."));
  })
  .catch(err => {
    log(chalk.red("Unable to connect to the database:" + err));
  });
module.exports = sequelize;
