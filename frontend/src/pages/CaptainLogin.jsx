import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {captain , setCaptain} = React.useContext(CaptainDataContext);



  const submitHandler = async(e) => {
    e.preventDefault();
    const captain={
      email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)
    if(response.status==200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }



    
    
    setEmail('');
    setPassword('');
    
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <div className="mb-10">
        <img
          className="w-16 mb-2"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="logo"
        />
        <FaArrowRight />
        </div>
       
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
          Join a fleet?
          <Link to="/captain-signup" className="text-blue-600">
            became a captain
          </Link>
        </p>
      </div>
      <div>
        <Link to="/login"
         className="bg-[#e8a305] flex items-center justify-center w-full text-white p-2 px-4 mb-7 text-lg rounded-md font-semibold">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
