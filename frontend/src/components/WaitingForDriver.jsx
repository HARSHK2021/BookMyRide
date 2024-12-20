import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";

import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const WaitingForDriver = (props) => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
        <img
             className="h-12"
             src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
             alt="car"
           />

        <div className="text-right">
          <h2 className="text-lg font-medium">{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600"> Maruti Wagnor</p>
          
            <h2 className="text-lg font-semibold ">{props.ride?.otp}</h2>
          
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
                <p className="-mt-1 text-gray-600 text-lg">
                  {props.ride?.pickup}

                </p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
