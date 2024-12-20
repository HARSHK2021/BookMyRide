import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

 
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    const captainData ={
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    }
    console.log(captainData)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register `,captainData)
    if(response.status==201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home') 
    }

   
    setEmail("");
    setPassword("");
    setLastname("");
    setFirstname("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
    setVehicleCapacity("");

  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <img
              className="w-16 mb-1"
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
            <h3 className=" font-medium mb-2 text-base">
              {" "}
              What&apos;s your name{" "}
            </h3>
            <div className="flex gap-4 mb-5 ">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="bg-[#eeeeee] w-1/2 border border-slate-400 rounded-md px-4 py-2  text-lg placeholder:text-sm"
                placeholder=" firstname "
              />

              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="bg-[#eeeeee] w-1/2 border border-slate-400 rounded-md px-4 py-2 text-lg placeholder:text-sm"
                placeholder=" lastname"
              />
            </div>

            <h3 className=" text-base font-medium mb-2">
              {" "}
              What&apos;s your email
            </h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-full text-lg placeholder:text-sm  "
              type="email"
              required
              placeholder="Enter your email"
            />
            <h3 className=" text-base font-medium mb-2">Enter Password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-full text-lg placeholder:text-sm "
              type="password"
              required
              placeholder="Enter your password"
            />

            <h3 className=" text-base font-medium mb-2">
              {" "}
              Vehicle Information{" "}
            </h3>
            <div>
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-1/2 text-lg placeholder:text-sm"
                    placeholder=" vehicle Color"
                  />

                  <input
                    type="text"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-1/2 text-lg placeholder:text-sm"
                    placeholder=" vehicle Plate"
                  />
                </div>
                <div className="flex gap-4">
                  
                <input
                    type="text"
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    className="bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-1/2 text-lg placeholder:text-sm"
                    placeholder=" vehicle Capacity"
                  />

                  <select name="Select Vehicle" id=""
                
                  value={vehicleType}
                  className=" text-sm bg-[#eeeeee] mb-6 border border-slate-400 rounded-md px-4 py-2 w-1/2  placeholder:text-sm"
                  onChange={(e)=>{
                    setVehicleType(e.target.value)
                  }}>
                    
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="auto"> Auto</option>
                    
                  </select>

                </div>
              </div>
            </div>

            <button className="bg-black w-full text-white p-2 px-4 mb-3 text-lg rounded-md font-semibold">
              Create captain account
            </button>
          </form>
          <p className="text-center text-sm">
            Already have an account?
            <Link to="/captain-login" className="text-blue-600">
              {" "}
              Login here{" "}
            </Link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CaptainSignup;
