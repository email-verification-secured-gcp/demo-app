
import { createUser,getUserByUsername,updateUserByUsername } from "../services/user-service.js";
import basicAuth from "basic-auth";

export const getUser = async (req, res) => {
    const { name } = basicAuth(req);
    try {
      const user = await getUserByUsername(name);
      if (user) {
        delete user.password;
        res.status(204).send();
      } else {
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
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found or no changes made' });
      }
    } catch (error) {
      console.error('Error in updateUser controller:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const createUserController = async (req, res) => {
    const userData = req.body;
    console.log(userData);
    try {
      const newUser = await createUser(userData);
      if(!newUser)
      {
        return res.status(400).send();
      }
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in createUser controller:', error.message);
      return res.status(503).json();
    }
  };