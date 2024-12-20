import React from "react";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const RidePopUp = (props) => {
  return (
    <div>
     
     <div className="flex items-center justify-end">
      <IoMdClose onClick={()=>{
        props.setRidePopupPanel(false);
      }} className="text-2xl" />
      </div>
   
      <div className="bg-yellow-400 rounded-lg p-3 mt-4 flex items-center justify-between border border-yellow-600 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://static.wikia.nocookie.net/b30b9ff3-a9f8-41a4-b620-87990cf3a233/scale-to-width/755"
            alt=""
          />
          <h3 className="text-lg capitalize font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h3>
        </div>
        <div className="bg-yellow-300 rounded-lg p-1">
         <h5 className="text-lg font-semibold"> 2.2 KM</h5>
        </div>
      </div>

      <div className="flex justify-between gap-2 items-center flex-col">
        <div className="w-full flex flex-col gap-2 ">
          <div className="flex gap-5  rounded-lg border-b-2 p-3 ">
            <div className="flex items-center ">
              <FaLocationDot className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium text-xl">62/11-A</h3>
              <p className="-mt-1 text-gray-600 text-lg">{props.ride?.pickup}</p>
            </div>
          </div>

          <div>
            <div className="flex gap-5  rounded-lg  border-b-2 p-3 ">
              <div className="flex items-center ">
                <FaLocationCrosshairs className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-xl">62/11-A</h3>
                <p className="-mt-1 text-gray-600 text-lg">
                  {props.ride?.destination}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-5 bor rounded-lg  border-b-2 p-3 ">
              <div className="flex items-center ">
                <RiMoneyRupeeCircleLine className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-xl"> ₹{props.ride?.fare}</h3>
                <p className="-mt-1 text-gray-600 text-lg">
                  cash cash
                </p>
              </div>
            </div>
          </div>
        </div>

       <div className=" mt-4 gap-8 flex items-center justify-between ">
       <button
          onClick={() => {
            
            props.setConfirmRidePopupPanel(false);

          }}
          className=" p-3 bg-gray-300 font-medium text-black p-2 rounded-lg"
        >
          Ignore Ride
        </button>
       <button
          onClick={() => {
            props.setConfirmRidePopupPanel(true);
            
            props.confirmRide(); 

          }}
          className=" p-3 bg-green-400 font-medium text-white p-2 rounded-lg"
        >
          Accept Ride
        </button>

       
       </div>
      </div>
    </div>
  );
};

export default RidePopUp;
