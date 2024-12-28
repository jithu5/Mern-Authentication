import exress from 'express';
import { isAuthenticated, login, logout, register, sendPasswordReset, sendVerifyOtp, verifyEmail, verifyResetOtp } from '../controllers/auth-controller.js';
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

authRouter.get('/isAuth',userAuth,isAuthenticated)

authRouter.post("/send-reset-password-otp", sendPasswordReset);

authRouter.post('/reset-password',verifyResetOtp)


export default authRouter;