import User from "../models/User.js";
import { generateHash } from "../utilities/util.js";
import { PubSub } from "@google-cloud/pubsub";
import { queueConfig } from "../../config/config.js";
export const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    if (user) {
      return user.toJSON();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};


const isUsernameTaken = async (username) => {
  try {
    const existingUser = await User.findOne({
      where: { username: username },
    });

    return !!existingUser;
  } catch (error) {
    console.error('Error checking username existence:', error);
    throw error;
  }
};

export const updateUserByUsername = async (username, updatedUserData) => {
  try {
    const existingUser = await User.findOne({ where: { username: username } });
    if (!existingUser) {
      return null;
    }
    const data = existingUser.toJSON();
    for (const key in updatedUserData) {
      data[key] = updatedUserData[key];
    }
    data.account_updated = new Date().toISOString();
    const [updatedRows, count] = await User.update(data, {
      where: { username: username },
      returning: true,
    });
    if (count > 0) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  const { username } = userData;
  const isTaken = await isUsernameTaken(username);
  if (isTaken) {
    return null;
  }
  try {
    const newUser = await User.create(userData);
    const user = newUser.toJSON();
    delete user.password;
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const publishMessage = async (userData) => {

  const projectId = queueConfig.PROJECT_ID;
  // Instantiates a client
  const pubsub = new PubSub({projectId});
  // Creates a new topic
  const topic = await pubsub.topic(queueConfig.TOPIC);
  userData.receivedTimeStamp=new Date().toISOString();
  topic.publishMessage({data: Buffer.from(JSON.stringify(userData))});
}