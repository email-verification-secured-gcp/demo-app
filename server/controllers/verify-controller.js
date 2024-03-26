import Logger from 'node-json-logger';
const logger = new Logger();
import email from "../models/email.js";
import User from '../models/User.js';

export const verifyEmail= async(req,res)=>{

    const id =req.params.token
    try {
        const emailDetails = await email.findById(id);
        if (!emailDetails) {
            return res.status(404).json({ error: "Email not found" });
        }
        const timestamp = new Date(emailDetails.timestamp);
        const currentTime = Date.now();
        if (currentTime - timestamp <= 120000) {
            const user = await User.findOne({
                where: { username: emailDetails.email },
              });
            user.is_verified=true;
            await user.save();
            return res.status(200).json({ message: "Verification successful" });
        }
        else{
            return res.status(400).json({ error: "Link expired" });
        }
    } catch (error) {
    logger.error(error); 
    return res.status(500).json({ error: "Internal server error" });
}

}