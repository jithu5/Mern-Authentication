import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

function ResetPassword() {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [newPassword, setNewPassword] = useState('')
  const [email, setEmail] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)

  const { backendUrl } = useContext(AppContext)

  // Handle input navigation and paste functionality
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 4).split("");
    pasteData.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to update password with newPassword and verifyOtp
    // Handle response appropriately
    if (emailVerified) {
      try {
        const otp = inputRef.current.map((input) => input.value).join("");
      if (otp.length !== 4) {
        toast.error("Please enter a valid 4-digit OTP.");
        return;
      }
        const userData = {
          email,
          newPassword,
          otp: otp,
        }
        const { data } = await axios.post(
          `${backendUrl}/api/auth/reset-password`,userData
        );
        if (data.success) {
          toast.success("Password reset successfully.");
          navigate("/login");
          return;
        }
        toast.error(data.message);
      } catch (error) {
        toast.error(error.message)
      }
    }else{
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/send-reset-password-otp`,
          { email }
        );
        if (data.success) {
          toast.success(data.message);
          setEmailVerified(true);
          return
        }
        toast.error(data.message);
      } catch (error) {
        toast.error(error.message)
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
        />
        <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={handleSubmit}>
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Verify Your Email
          </h1>

          {/* input form when otp send to your email */}
          {emailVerified && (
            <>
              <p className="text-center mb-6 text-indigo-600">
                Enter the 4-digit code sent to your email
              </p>
              <div className="flex justify-between mb-8" onPaste={handlePaste}>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      ref={(el) => (inputRef.current[index] = el)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                      required
                    />
                  ))}
              </div>
              <div className="flex items-center justify-center flex-col gap-1 mb-5">
                <p className="text-center mb-6 text-indigo-600">
                  Enter your new password
                </p>
                <input
                  className="block mx-auto outline-none border border-gray-700 px-3 py-1 rounded-md focus:border-gray-900 bg-[#333A5C] text-white text-lg"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="password"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-gray-500 rounded-full px-12 py-2.5 hover:border-gray-200 text-white transition-all"
              >
                Reset Password
              </button>
            </>
          )}

          {/* input form when email need to send for otp purpose */}
          {!emailVerified && <>
            <p className="text-center mb-6 text-indigo-600">
              Enter your registered email address to reset your password
            </p>
            <input
              className="block mx-auto outline-none border border-gray-700 px-3 py-1 rounded-md focus:border-gray-900 bg-[#333A5C] text-white text-lg mb-5"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
            />
            <button
              type="submit"
              className="w-full border border-gray-500 rounded-full px-12 py-2.5 hover:border-gray-200 text-white transition-all"
            >
              Send Verification Email
            </button>
          </>}
          
        </form>
      </div>
    </>
  );
}

export default ResetPassword
