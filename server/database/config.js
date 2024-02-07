import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/dbConfig.js";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: dbConfig.HOST,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
  });
  
export default sequelize;