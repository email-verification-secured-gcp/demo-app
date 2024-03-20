
import { healthCheck } from "../services/health-service.js";
import Logger from 'node-json-logger';
const logger = new Logger();
export const getHealth = async(req,res)=>{
    try{
        if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
            logger.error("Invalid input request");
            res.status(400).send(); 
        }
        logger.info("App successfully started at port 3000");
        await healthCheck(req,res);
    }
    catch (err)
    {    
        logger.error("Error creating app");
         res.status(503).send();
    }
}