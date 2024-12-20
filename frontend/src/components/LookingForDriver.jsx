import React from 'react'
import { FaLocationCrosshairs, FaLocationDot } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';

const LookingForDriver = (props) => {
  return (
    <div>
         <div className="flex justify-between">
      <div>
        <h3 className="text-2xl font-semibold mb-5">Looking for ride  </h3>
        </div>
        <div
          onClick={() => {
            props.setVehicleFound(false);
          }}
        >
          <IoMdClose className=" inline h-10 w-6" />
        </div>
       
      </div>
         

         <div className="flex justify-between gap-2 items-center flex-col">
          
          <img
             className="h-20"
             src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
             alt="car"
           />
           <div className="w-full flex flex-col gap-2 ">
             <div className="flex gap-5  rounded-lg border-b-2 p-3 ">
               <div className="flex items-center ">
                 <FaLocationDot className="text-xl" />
               </div>
               <div>
                 <h3 className="font-medium text-xl">62/11-A</h3>
                <p className="-mt-1 text-gray-600 ">{props.pickup}</p>
               </div>
             </div>
   
             <div>
               <div className="flex gap-5  rounded-lg  border-b-2 p-3 ">
                 <div className="flex items-center ">
                 <FaLocationCrosshairs  className="text-xl"/>

                 </div>
                 <div>
                   <h3 className="font-medium text-xl">62/11-A</h3>
                   <p className="-mt-1 text-gray-600 text">
                     {props.destination}
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
                   <h3 className="font-medium text-xl">₹{props.fare[props.vehicleType]}</h3>
               
                 </div>
               </div>
             </div>
           </div>
   
          
         </div>
       </div>
  )
}

export default LookingForDriver
