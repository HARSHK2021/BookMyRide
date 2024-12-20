import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname, setLastname] = useState("");  

  const navigate = useNavigate();

  const {user , setUser} = React.useContext(UserDataContext)


  const submitHandler= async(e)=>{
    e.preventDefault();
    const newUser ={
      email,
      password,
      fullname:{
        firstname,
        lastname
      }
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
    if(response.status==201){
      const data = response.data
      
      setUser(data.user)
      localStorage.setItem('token',data.token)

      navigate('/login')
    }
   
    setEmail("");
    setPassword("");
    setLastname("");
    setFirstname("");

  }
  return (
    <div>
        <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="logo"
        />
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}
          
        >
          <h3 className=" font-medium mb-2 text-base"> What&apos;s your name </h3>
        <div className="flex gap-4 mb-5 ">
        <input type="text"
           value={firstname}
           onChange={(e)=>setFirstname(e.target.value)}
           className="bg-[#eeeeee] w-1/2 border border-slate-400 rounded-md px-4 py-2  text-lg placeholder:text-sm"
           placeholder=" firstname " />

          <input type="text" 
           value={lastname}
           onChange={(e)=>setLastname(e.target.value)}
           className="bg-[#eeeeee] w-1/2 border border-slate-400 rounded-md px-4 py-2 text-lg placeholder:text-sm"
           placeholder=" lastname"/>

        </div>
          
          <h3 className=" text-base font-medium mb-2"> What&apos;s your email</h3>
          <input

          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-full text-lg placeholder:text-sm  "
            type="email"
            required
            placeholder="Enter your email"
          />
          <h3 className=" text-base font-medium mb-2">Enter Password</h3>
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-full text-lg placeholder:text-sm "
            type="password"
            required
            placeholder="Enter your password"
          />
          <button className="bg-black w-full text-white p-2 px-4 mb-3 text-lg rounded-md font-semibold">
            Create account
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            {" "}
            Login here{" "}
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-signup"
         className="bg-[#83d06d] flex items-center justify-center w-full text-white p-2 px-4 mb-7 text-lg rounded-md font-semibold">
          Signup as Captain
        </Link>
      </div>
    </div>
      
    </div>
  )
}

export default UserSignup
