import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin,getUserData } = useContext(AppContext);

  const [state, setState] = useState("signup");

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInput((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct data to send to the backend
    try {
      const dataToSend = {
        email: userInput.email,
        password: userInput.password,
      };
      axios.defaults.withCredentials = true;

      if (state === "signup") {
        dataToSend.username = userInput.username; // Add fullname only for signup

        const { data } = await axios.post(
          `${backendUrl}/api/auth/register`,
          dataToSend
        );
        if (data.success) {
          setIsLoggedin(true);
          getUserData()
          navigate("/");
          return;
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          dataToSend
        );
        if (data.success) {
          setIsLoggedin(true);
          getUserData()
          navigate("/");
          toast.success(data.message);
          return;
        } else {
            console.log(data)
            throw new Error(data.message)
        }
      }
    } catch (error) {
        console.log(error.message)
      toast.error(error.message);
    }

    // reset to default state
    setUserInput({
      email: "",
      password: "",
      username: "",
    });
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
        <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === "signup" ? "Create Account" : "Login"}
          </h2>
          <p className="text-sm text-white text-center mb-3">
            {state === "signup"
              ? "Create your account"
              : "Login to your account"}
          </p>

          <form onSubmit={handleSubmit}>
            {state === "signup" && (
              <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="username"
                  name="username"
                  value={userInput.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="email"
                placeholder="Email id"
                name="email"
                value={userInput.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="password"
                placeholder="Password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
                required
              />
            </div>
            <Link
              to={"/reset-password"}
              className="mb-4 inline-block text-indigo-500 cursor-pointer"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              className="w-full px-5 py-3 text-white font-medium rounded-full bg-indigo-500 hover:bg-indigo-600"
            >
              {state === "signup" ? "Sign Up" : "Log in"}
            </button>
          </form>
          {state === "signup" ? (
            <p className="text-center mt-4 text-xs text-gray-400">
              Already have an Account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-center mt-4 text-xs text-gray-400">
              Don't have an Account?{" "}
              <span
                onClick={() => setState("signup")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
