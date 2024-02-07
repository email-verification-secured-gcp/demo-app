import express from 'express';
import { createUserController,getUser,updateUser } from "../controllers/user-controller.js";
import { validatePayload, validateUserInput,isVerifiedUser, validateUpdatePayload } from '../services/validation-service.js';
import { methodNotAllowed } from '../utilities/util.js';

const router = express.Router();


router.route('/')
      .post(validateUserInput,createUserController)
      .all(methodNotAllowed);

router.route('/self')
      .get(validatePayload,isVerifiedUser,getUser)
      .put(validateUpdatePayload,isVerifiedUser,updateUser)
      .all(methodNotAllowed);      

export default router;
