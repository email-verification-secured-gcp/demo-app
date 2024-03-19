import basicAuth from "basic-auth";
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword, generateHash, isValidEmail } from '../utilities/util.js'
import Logger from 'node-json-logger';
const logger = new Logger();


export const  isVerifiedUser = async (req, res, next) => {

    const credentials = await basicAuth(req);
    try {
        if (!credentials || ! await check(credentials.name, credentials.pass)) {
            logger.error(`Invalid user:${credentials.name}`);
            res.status(401).send();
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(503).send();
    }

}

async function check(username, password) {
    try {
        const user = await User.findOne({
            where: { username: username },
        });
        if (user && await comparePassword(password, user.password)) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        logger.error('Error checking user credentials:', error);
        throw error;
    }

}

export const validateUserInput = async (req, res, next) => {
    const { first_name, last_name, password, username } = req.body;
    if (!first_name || !last_name || !password || !username ||  !isValidEmail(username)) {
        logger.error(`Invalid user input sent,${JSON.stringify(req.body)}`);
        return res.status(400).send();
    }

    req.body.id = uuidv4();
    req.body.password = await generateHash(password);
    req.body.account_created = new Date().toISOString();
    req.body.account_updated = new Date().toISOString();

    next();
};

export const validatePayload = async (req, res, next) => {

    if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
        logger.error(`Invalid user input sent,${JSON.stringify(req.body)}`);
        res.status(400).send();
    }
    next();
}


export const validateUpdatePayload = async(req,res,next) =>{

    const { first_name, last_name, password } = req.body;

    if (Object.keys(req.body).length>3 || !first_name || !last_name || !password ) {
        logger.error(`Invalid user input sent,${JSON.stringify(req.body)}`);
        return res.status(400).send();
    }
    req.body.password = await generateHash(password);
    next();
}
