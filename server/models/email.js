import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/config.js';
import Logger from 'node-json-logger';
const logger = new Logger();


const email = sequelize.define('email', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

sequelize.sync()
  .then(() => {
    logger.info('email-syncronize with database');
  })
  .catch((error) => {
    logger.error(error);
  });

export default email;