import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

function ResetPassword() {
  const navigate  = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer"
        />
        <form>
          
        </form>
      </div>
    </>
  );
}

export default ResetPassword
