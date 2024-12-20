/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { TiUser } from "react-icons/ti";

const VehiclePanel = (props) => {
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold mb-5">Choose a Rider </h3>
        <div
          onClick={() => {
            props.setVehiclePanelOpen(false);
            
          }}
        >
          <IoMdClose className=" inline h-10 w-6" />
        </div>
      </div>

      <div onClick={()=>{
        props.setConfirmRidePanel(true)
        props.selectVehicle('car')

      }} className="flex border-2 mb-2 active:border-black rounded-xl  w-full p-3  items-center justify-between">
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="car"
        />

        <div className="  w-1/2">
          <h4 className="font-medium text-base">
            UberGo <TiUser className="inline" /> 3{" "}
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable ,compact rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
      </div>
      <div onClick={()=>{
        props.setConfirmRidePanel(true)
        props.selectVehicle('bike')
      }} className="flex border-2 mb-2 active:border-black  rounded-xl  w-full p-3  items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="car"
        />

        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-base">
            MotoGo <TiUser className="inline" /> 1{" "}
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable ,Motercycle Rides
          </p>
        </div>

        <h2 className="text-lg font-semibold"> ₹{props.fare.bike}</h2>
      </div>
      <div onClick={()=>{
        props.setConfirmRidePanel(true)
        props.selectVehicle('auto')
      }} className="flex border-2 mb-2 active:border-black  rounded-xl  w-full p-3  items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="car"
        />

        <div className="  w-1/2">
          <h4 className="font-medium text-base">
            UberGo <TiUser className="inline" /> 2{" "}
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-gray-600 text-xs">
            Affordable ,Auto rides
          </p>
        </div>

        <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
