import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { FaSearchLocation } from "react-icons/fa";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import LiveLocationMap from "../components/LiveLocationMap";


const Home = () => {
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const waitingForDriverRef = useRef();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

const navigate = useNavigate();
/// socket io part
      const {socket} = useContext(SocketContext);
      const {user } = useContext(UserDataContext);
      

   useEffect(()=>{
  
    socket.emit("join", {userType:"user", userId:user._id})
   },[user])

   socket.on('ride-confirmed',ride=>{
    setRide(ride)
    setVehicleFound(false);
    setWaitingForDriverPanel(true);
    console.log("ride confiemed hoo gaye server captainse",ride);
   })

   socket.on('ride-started',ride=>{
    setWaitingForDriverPanel(false);
    navigate('/riding',{state:{ride}})
    console.log("ride after acceptingg and updattion",ride);
 
   })
 
    

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      if(e.target.value.length >3){
        const response = await axios.get(
          `http://localhost:4000/maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        setPickupSuggestions(response.data);
      }
      
    } catch (err) {
      // console.error(err);
    }
  };


  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      if(e.target.value.length > 2){
        const response = await axios.get(
          `http://localhost:4000/maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        setDestinationSuggestions(response.data);
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    console.log("hello in funtion")
    console.log("picked up",pickup)
    console.log("destination", destination)
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFare(response.data);
      
  }

  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType 
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

   


  }

  

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="logo" 
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <LiveLocationMap/>
      </div>
      <div className=" top-0 absolute h-screen w-full flex flex-col justify-end  ">
        <div className="h-[30%] bg-white p-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className=" absolute opacity-0  top-6 right-6 text-2xl"
          >
            <RiArrowDownWideLine />
          </h5>
          <h4 className=" text-2xl font-semibold ">Find a trip </h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-black rounded-full"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-base w-full rounded-lg mt-5 "
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <div className="flex items-center justify-center bg-black text-white mt-6 rounded-lg gap-2 p-2">
            <h3>
              <FaSearchLocation className="text-xl" />
            </h3>
            <button onClick={findTrip} className="font-semibold">
              Find trip
            </button>
          </div>
        </div>
        <div ref={panelRef} className="  h-0 bg-white  ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            
            
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed  w-full z-10 bottom-0 translate-y-full bg-white p-3 px-3 py-10 pt-12"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed  w-full z-10 bottom-0 translate-y-full bg-white p-3 px-3 py-6 pt-12"
      >
        <ConfirmRide
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          fare={fare}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          
          


        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 px-3 py-6 pt-18"
      >
        <LookingForDriver 
         setVehicleFound={setVehicleFound}
         vehicleType={vehicleType}
         createRide={createRide}
         pickup={pickup}
         destination={destination}
         fare={fare}
         setWaitingForDriverPanel={setWaitingForDriverPanel}
         />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0  bg-white p-3 px-3 py-6 pt-12"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingForDriverPanel={waitingForDriverPanel}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>
    </div>
  );
};

export default Home;
