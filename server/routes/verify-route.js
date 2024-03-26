import express from 'express';
import { verifyEmail } from '../controllers/verify-controller.js';


const router = express.Router();
router.route('/',verifyEmail);

export default router;