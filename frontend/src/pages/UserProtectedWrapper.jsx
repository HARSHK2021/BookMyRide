import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext)
  const [isLoading, setIsLoading]= useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers: { Authorization: `Bearer ${token}` }
    }).then(response =>{
      if(response.status=== 200){
        setUser(response.data)
        setIsLoading(false)
      }
    }).catch(err=>{
      console.error(err)
      localStorage.removeItem("token")
      navigate("/login")

    })
  }, [token]); // Dependency array ensures the effect runs when `token` or `navigate` changes

if(isLoading){
  return ( <div> Loading....</div>)
 
}

  


  return <>{children}</>;
};

export default UserProtectedWrapper;
