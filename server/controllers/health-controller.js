
import { healthCheck } from "../services/health-service.js";
export const getHealth = async(req,res)=>{
    try{
        if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
            res.status(400).send(); 
        }
         await healthCheck(req,res);
    }
    catch (err)
    {
         res.status(503).send();
    }
}