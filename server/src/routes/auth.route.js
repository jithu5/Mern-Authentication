import exress from 'express';
import { login, logout, register, sendVerifyOtp, verifyEmail } from '../controllers/auth-controller.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';

const authRouter = exress.Router();

// Route to register a new user
authRouter.post('/register',register)

// Route to login a user
authRouter.post('/login',login)

// Route to logout a user
authRouter.post('/logout',logout)

authRouter.post('/sendVerifyOtp',userAuth,sendVerifyOtp)

authRouter.post('/verifyOtp',userAuth,verifyEmail)


export default authRouter;