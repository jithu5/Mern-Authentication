import React, { useContext } from 'react'
import { assets} from "../assets/assets"
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function NavBar() {

    const { userdata,backendUrl,setUserdata,setIsLoggedin } = useContext(AppContext)

  return (
    <>
     <header className='w-full flex items-center justify-between p-4 sm:p-5 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="" className='w-28 sm:w-32'/>
        <Link to={'/login'} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login <img src={assets.arrow_icon} alt="" /></Link>
     </header> 
    </>
  )
}

export default NavBar
