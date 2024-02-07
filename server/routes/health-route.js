import express from 'express';
import { getHealth } from '../controllers/health-controller.js';
import { methodNotAllowed } from '../utilities/util.js';

const router = express.Router();


router.route('/')
    .get(getHealth)
    .options(methodNotAllowed)
    .head(methodNotAllowed)
    .all(methodNotAllowed);
export default router;