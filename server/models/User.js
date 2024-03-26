import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/config.js';
import Logger from 'node-json-logger';
const logger = new Logger();


const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    account_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    account_updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    timestamps: false,
    toJSON: {
        exclude: ['password'],
      }
  });

  sequelize.sync()
  .then(() => {
    logger.info('syncronize with database');
  })
  .catch((error) => {
    logger.error(error);
  });

export default User;