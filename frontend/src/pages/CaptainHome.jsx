import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import {SocketContext} from '../context/SocketContext'
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from "axios";
import LiveLocationMap from "../components/LiveLocationMap";


const CaptainHome = () => {
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef= useRef(null)

  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);

  // console.log(captain);
  console.log("captain ke infro for connecting", captain._id)
  useEffect(() => {
    socket.emit('join', {
        userId: captain._id,
        userType: 'captain'
        
    })
    const updateLocation =()=>{
    
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
         
          socket.emit('update-location-captain', {
            userId: captain._id,
            location:{
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
           
             
            
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

     
}, []) 

socket.on('new-ride',(data)=>{
  
  setRide(data);
  setRidePopupPanel(true);

})


async function confirmRide() {
  console.log("ride confirmed")
 const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
  rideId: ride._id,
  captainId: captain._id,
   
 },{
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
 })
 setRidePopupPanel(false);
 setConfirmRidePopupPanel(true);
  
} 




  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform:"translateY(0)"
      })

    }else{
      gsap.to(ridePopupPanelRef.current,{
        transform:"translateY(100%)"
      })
    }

  },[ridePopupPanel])

  useGSAP(function(){
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current,{
        transform:"translateY(0)"
      })
    }else{
      gsap.to(confirmRidePopupPanelRef.current,{
        transform:"translateY(100%)"
      })
    }
  },[confirmRidePopupPanel])

  




  return (
    <div className="h-screen ">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        <img className="w-16 " src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <Link
          to="/captain-login"
          className="h-10 w-10  bg-white flex items-center justify-center rounded-full "
        >
          <IoIosLogOut className=" text-lg font-bold" />
        </Link>
      </div>
      <div className="h-3/5">
      <LiveLocationMap/>
      </div>
        
        <div className="h-2/5 p-6">
         
         <CaptainDetails></CaptainDetails>
          

        </div>
        <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 mt-12">
          <RidePopUp 
          setRidePopupPanel={setRidePopupPanel} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
          
          ride={ride}
          />
        </div>

        <div ref={confirmRidePopupPanelRef} className="fixed h-screen w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 mt-12">
          <ConfirmRidePopUp 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
          setRidePopupPanel={setRidePopupPanel} 
          ride={ride}  />
        </div>
          
    
    </div>
  );
};

export default CaptainHome;
