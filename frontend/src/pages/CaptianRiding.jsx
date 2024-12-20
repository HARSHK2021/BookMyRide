import React, { useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link,useLocation } from "react-router-dom";
import { RiArrowUpWideLine } from "react-icons/ri";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

import FinishRide from "../components/FinishRide";
import LiveLocationMap from "../components/LiveLocationMap";
const CaptianRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finsihRidePanelRef= useRef(null)
  const location = useLocation();
  const rideData = location.state?.ride

useGSAP(function(){
  if(finishRidePanel){
    gsap.to(finsihRidePanelRef.current,{
      transform:"translateY(0)"
    })
  }else{
    gsap.to(finsihRidePanelRef.current,{
      transform:"translateY(100%)"
    })
  }
 
},[finishRidePanel])


  return (
    <div className="h-screen  ">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        <img
          className="w-16 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10  bg-white flex items-center justify-center rounded-full "
        >
          <IoIosLogOut className=" text-lg font-bold" />
        </Link>
      </div>
      <div className="h-4/5">
      <LiveLocationMap/>
      </div>

      <div className="h-1/5  p-6 bg-yellow-400 flex flex-col gap-2 ">
        <div className="flex items-center justify-center">
          <RiArrowUpWideLine className="text-xl" onClick={() => {
            setFinishRidePanel(true);
          }} />
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold"> 4 KM away </h4>
          <button className="p-3  bg-green-400 font-medium text-white px-10  rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>

      <div ref={finsihRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 mt-12">
          <FinishRide 
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}/>

        </div>
    </div>
  );
};

export default CaptianRiding;
