import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from'axios'
import {UserDataContext} from '../context/UserContext'
import {useNavigate} from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const {user , setUser} = useContext(UserDataContext)

const navigate = useNavigate()


  const submitHandler = async(e) => {
    e.preventDefault();
  const userData={
    email: email,
    password: password
  }
 
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
  if(response.status==200){
    const data = response.data
   
    setUser(data.user)
   
    localStorage.setItem('token',data.token)
    navigate('/home')
  }
    
    setEmail('');
    setPassword('');
    
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2"> What&apos;s your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 border border-slate-400 rounded-md px-4 py-2 w-full text-lg placeholder:text-base  "
            type="email"
            required
            placeholder="Enter your email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 border border-slate-400 rounded-md px-4 py-2 w-full text-lg placeholder:text-base "
            type="password"
            required
            placeholder="Enter your password"
          />
          <button className="bg-black w-full text-white p-2 px-4 mb-3 text-lg rounded-md font-semibold">
            Login
          </button>
        </form>
        <p className="text-center text-sm">
          New here?
          <Link to="/signup" className="text-blue-600">
            {" "}
            Create new Account{" "}
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login"
         className="bg-[#83d06d] flex items-center justify-center w-full text-white p-2 px-4 mb-7 text-lg rounded-md font-semibold">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
