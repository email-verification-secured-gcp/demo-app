import Logger from 'node-json-logger';
const logger = new Logger();
import email from "../models/email.js";
import User from '../models/User.js';

export const verifyEmail= async(req,res)=>{
    const id =req.query.token;
    try {
        const emailDetails = await email.findByPk(id);
        if (!emailDetails) {
            logger.log("email not found for :",id);
            return res.status(404).json({ error: "Email not found" });
        }
        if(emailDetails.is_verified)
        {
            logger.log("email already verified for :",id);
            return res.status(409).json({ error: "Email already verified" });
        }
        const timestamp = new Date(emailDetails.timestamp);
        const currentTime = Date.now();
        logger.info("Received timestamp for email validation",timestamp);
        logger.info("current timestamp for email validation",currentTime);
        if (currentTime - timestamp <= 120000) {
            const user = await User.findOne({
                where: { username: emailDetails.email },
              });
            user.is_verified=true;
            emailDetails.is_verified= true;
            await emailDetails.save();
            await user.save();
            return res.status(200).json({ message: "Verification successful" });
        }
        else{
            return res.status(400).json({ error: "Link expired" });
        }
    } catch (error) {
    logger.error(error.toString()); 
    return res.status(500).json({ error: "Internal server error" });
}

}