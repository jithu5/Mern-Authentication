import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailtemplates.config.js";
import transporter from "../config/modemailer.config.js";
import UserModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

// Register route
export const register = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    throw new ApiError(400, "All fileds are required");
  }

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const newUser = await UserModel.create({
      username,
      email,
      password,
    });

    const token = await newUser.generateJwt();

    if (!token) {
      throw new ApiError(400, "Error creating token");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie("token", token, options);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Registration successful",
      text: `Welcome to our website, ${username}! Your account has been created successfully. Please verify your email address ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json(new ApiResponse(201, newUser, "Created new user successfully"));
  } catch (error) {
    throw new ApiError(500,error.message, error);
  }
});

// Login route
export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new ApiError(401, "Email or Password doesn't match");
    }

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) {
      throw new ApiError(401, "Email or Password doesn't match");
    }

    const token = await existingUser.generateJwt();
    console.log(token)

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json(new ApiResponse(200, existingUser, "Logged in successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message, error);
  }
});

// Logout route
export const logout = AsyncHandler(async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 0,
    };

    return res
      .status(200)
      .clearCookie("token", options)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (error) {
    throw new ApiError(500, "Error in logout", error);
  }
});

// send verification email notification with otp token
export const sendVerifyOtp = AsyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isAccountVerified) {
      throw new ApiError(400, "Account already verified.");
    }

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your email address",
      // text: `Your OTP for email verification is: ${otp}. Please enter it within 24 hours to complete the verification process.`,
      html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json(new ApiResponse(200, user, "OTP sent successfully"));
  } catch (error) {
    throw new ApiError(500,error.message);
  }
});

// verify the OTP and update the user's account
export const verifyEmail = AsyncHandler(async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    throw new ApiError(400, "User ID and OTP are required");
  }

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    if (Date.now() > user.verifyOtpExpireAt) {
      throw new ApiError(400, "OTP expired. Please request a new one.");
    }
    if (user.verifyOtp !== otp) {
      throw new ApiError(400, "Invalid OTP. Please try again.");
    }
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res
     .status(200)
     .json(new ApiResponse(200, user, "Email verified successfully"));

  } catch (error) {
    throw new ApiError(500,error.message, error);
  }
});

// check if the user is authenticated
export const isAuthenticated = AsyncHandler(async(req, res)=>{
  try {
    return res.status(200)
    .json(new ApiResponse(200,[],"Authenticated"));
  } catch (error) {
    throw new ApiError(401, "Invalid authorization");
  }
})

// send password reset otp
export const sendPasswordReset = AsyncHandler(async(req,res)=>{
    const { email } = req.body;
    if(!email){
      throw new ApiError(400,"Email is required");
    }
    try {
      const user = await UserModel.findOne({ email: email });

      if(!user){
        throw new ApiError(404,"User not found");
      }
      const otp = String(Math.floor(1000 + Math.random() * 9000));

      user.resetOtp = otp;
      user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
      await user.save();

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Password Reset Request",
        // text: `Your OTP for password reset is: ${otp}. Please enter it within 24 hours to complete the process.`,
        html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",email)
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json(new ApiResponse(200,user,"OTP sent successfully for password reset to your registered email"));
    } catch (error) {
      throw new ApiError(500,error.message)
    }
});

// verify otp for password reset
export const verifyResetOtp = AsyncHandler(async(req,res)=>{
  const { email, otp,newPassword } = req.body;
  if(!email ||!otp ||!newPassword){
    throw new ApiError(400,"User ID and OTP are required");
  }
  try {
    
    const user = await UserModel.findOne({ email});
    if(!user){
      throw new ApiError(404,"User not found");
    }
    if(Date.now() > user.resetOtpExpireAt){
      throw new ApiError(400,"OTP expired. Please request a new one.");
    }
    if(user.resetOtp!== otp){
      throw new ApiError(400,"Invalid OTP. Please try again.");
    }
    user.password = newPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;
    await user.save();
    return res.status(200).json(new ApiResponse(200,user,"Password reset successful"));
  } catch (error) {
    throw new ApiError(400,error.message);
  }
});

