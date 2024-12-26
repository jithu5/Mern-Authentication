import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AppContext = createContext(
    {
        backendUrl: '',
        isLoggedin: false,
        setIsLoggedin: () => {},
        userdata: false,
        setUserdata: () => {},
        getUserData: () => {},
    }
);

function AppContextProvider({children}) {

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const [isLoggedin, setIsLoggedin] = useState(false)

    const [userdata, setUserdata] = useState(null)

    axios.defaults.withCredentials = true;

    const getUserData = async()=>{
        try {
            const { data } = await axios.get(`${SERVER_URL}/api/user/profile`);
            data.success? setUserdata(data.data): setUserdata(null)
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    const getAuthStatus = async()=>{
        try {
            const { data } = await axios.get(`${SERVER_URL}/api/auth/isAuth`);
            console.log(data)
            if (data.success) {
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    useEffect(() => {
       getAuthStatus()
    }, [])
    


    const AppValue={
        backendUrl :SERVER_URL,
        isLoggedin,
        setIsLoggedin,
        userdata,
        setUserdata,
        getUserData,
    }
  return (
    <AppContext.Provider value={AppValue}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContextProvider,AppContext}
