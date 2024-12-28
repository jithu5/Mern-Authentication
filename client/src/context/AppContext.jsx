import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AppContext = createContext({
  backendUrl: "",
  isLoggedin: false,
  setIsLoggedin: () => {},
  userdata: null,
  setUserdata: () => {},
  getUserData: () => {},
  isLoading: false,
});

function AppContextProvider({ children }) {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userdata, setUserdata] = useState(null);

  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${SERVER_URL}/api/user/profile`);
      if (data.success) {
        setUserdata(data.data);
        setIsLoggedin(true);
      } else {
        setUserdata(null);
      }
    } catch (error) {
      setUserdata(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userdata) {
      getUserData();
    }
  }, []);

  const AppValue = {
    backendUrl: SERVER_URL,
    isLoggedin,
    setIsLoggedin,
    userdata,
    setUserdata,
    getUserData,
    isLoading,
  };

  return <AppContext.Provider value={AppValue}>{children}</AppContext.Provider>;
}

export { AppContextProvider, AppContext };
