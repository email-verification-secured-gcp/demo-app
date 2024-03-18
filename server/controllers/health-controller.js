
import { healthCheck } from "../services/health-service.js";
import Logger from 'node-json-logger';
const logger = new Logger();
export const getHealth = async(req,res)=>{
    try{
        if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
            logger.error("App not working");
            res.status(400).send(); 
        }
        logger.info("App successfully started at port 3000");
        await healthCheck(req,res);
    }
    catch (err)
    {
         res.status(503).send();
    }
}