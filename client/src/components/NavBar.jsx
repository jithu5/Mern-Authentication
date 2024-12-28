import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function NavBar() {

  const navigate = useNavigate()
  const { userdata, backendUrl, setUserdata, setIsLoggedin } =
    useContext(AppContext);

    const logOut = async()=>{
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
        if (data.success) {
          setIsLoggedin(false);
          setUserdata(null);
          navigate("/");
          return;
        }
        toast.error(data.message);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }

    const sendVerifyOtp = async ()=>{
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(
          `${backendUrl}/api/auth/sendVerifyOtp`
        );
        if (data.success) {
          navigate("/verify-email");
          toast.success("Verification OTP sent to your email");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }

  return (
    <>
      <header className="w-full flex items-center justify-between absolute top-0 py-6 px-7 sm:px-12 sm:py-10">
        <img src={assets.logo} alt="" className="w-28 sm:w-32" />
        {userdata ? (
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group cursor-pointer">
            {userdata.username[0].toUpperCase()}
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                {!userdata.isAccountVerified && (
                  <li onClick={sendVerifyOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                    Verify Email
                  </li>
                )}
                <li onClick={logOut} className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            Login <img src={assets.arrow_icon} alt="" />
          </Link>
        )}
      </header>
    </>
  );
}

export default NavBar;
