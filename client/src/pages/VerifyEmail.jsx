import React, { useContext, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

function VerifyEmail() {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const { backendUrl, isLoggedin, isLoading, userdata, getUserData } =
    useContext(AppContext);

  // Protect the route
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedin || !userdata) {
        toast.error("Please login to access this page.");
        navigate("/login");
      } else if (userdata.isAccountVerified) {
        // toast.info("Your email is already verified.");
        navigate("/");
      }
    }
  }, [isLoggedin, userdata, isLoading, navigate]);

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

  // OTP submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRef.current.map((input) => input.value).join("");
      if (otp.length !== 4) {
        toast.error("Please enter a valid 4-digit OTP.");
        return;
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/verifyOtp`, {
        otp,
      });

      if (data.success) {
        toast.success("Email verified successfully");
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
      />
      <form
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Verify Your Email
        </h1>
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
        <button
          type="submit"
          className="w-full border border-gray-500 rounded-full px-12 py-2.5 hover:border-gray-200 text-white transition-all"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
}

export default VerifyEmail;
