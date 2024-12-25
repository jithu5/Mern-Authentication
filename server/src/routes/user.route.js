import express from 'express';
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { getUserData } from '../controllers/user-controller.js';

const userRouter = express.Router();


userRouter.get("/profile",userAuth,getUserData)


export default userRouter;