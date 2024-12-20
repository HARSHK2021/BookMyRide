import { IoMdClose } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const ConfirmRide = (props) => {
  const carImage = "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
  const bikeImage ="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
  const autoImage = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
  
          

  return (
    <div >
      <div className="flex justify-between">
      <div>
        <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
        </div>
        <div
          onClick={() => {
            props.setConfirmRidePanel(false);
          }}
        >
          <IoMdClose className=" inline h-10 w-6" />
        </div>
       
      </div>

      <div className="flex justify-between gap-2 items-center flex-col">
      {props.vehicleType === 'car' && <img className="h-20" src={carImage} alt="Car" />}
        {props.vehicleType === 'bike' && <img className="h-20" src={bikeImage} alt="Bike" />}
        {props.vehicleType === 'auto' && <img className="h-20" src={autoImage} alt="Auto" />}
        <div className="w-full flex flex-col gap-2 ">
          <div className="flex gap-5  rounded-lg border-b-2 p-3 ">
            <div className="flex items-center ">
              <FaLocationDot className="text-xl" />
            </div>
            <div>
              <h3 className="font-medium text-xl">62/11-A</h3>
             <div>
             <p className="-mt-1 text-gray-600 ">{props.pickup}</p>
              </div> 
            </div>
          </div>

          <div>
            <div className="flex gap-5  rounded-lg  border-b-2 p-3 ">
              <div className="flex items-center ">
                <FaLocationCrosshairs className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-xl">62/11-A</h3>
                <div>
                <p className="-mt-1 text-gray-600 ">
                  {props.destination}
                </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-5 bor rounded-lg  border-b-2 p-3 ">
              <div className="flex items-center ">
                <RiMoneyRupeeCircleLine className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium text-xl"> ₹{props.fare[props.vehicleType]}</h3>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
          }}
          className="w-full mt-5 mb-6 bg-black font-medium text-white p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
