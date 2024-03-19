
import { createUser,getUserByUsername,updateUserByUsername } from "../services/user-service.js";
import basicAuth from "basic-auth";
import Logger from 'node-json-logger';
const logger = new Logger();

export const getUser = async (req, res) => {
    const { name } = basicAuth(req);
    try {
      const user = await getUserByUsername(name);
      if (user) {
        delete user.password;
        logger.info(`User successfully found:${user.username}`);
        res.status(200).send(user);
      } else {
        logger.warn(`User Not found:${name}`);
        res.status(400).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error in getUser controller:', error);
      res.status(503).send();
    }
  };

  export const updateUser = async (req, res) => {
    const { name } =  basicAuth(req);
    const updatedUserData = req.body;
    try {
      const updatedUser = await updateUserByUsername(name, updatedUserData);
      if (updatedUser) {
        logger.info(`User successfully updated: ${updateUser.username}`);
        res.status(204).send();
      } else {
        logger.warn("Unable to update the user");
        res.status(404).json({ message: 'User not found or no changes made' });
      }
    } catch (error) {
      logger.error('Error in updateUser controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const createUserController = async (req, res) => {
    const userData = req.body;
    try {
      const newUser = await createUser(userData);
      if(!newUser)
      {
        logger.warn("Unable to create the user");
        return res.status(400).send();
      }
      logger.info(`User successfully created:${newUser.username}`);
      return res.status(201).json(newUser);
    } catch (error) {
      logger.error('Error in createUser controller:', error.message);
      return res.status(503).json();
    }
  };