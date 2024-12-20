
import { FaLocationCrosshairs, } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import{Link, useLocation, useNavigate} from "react-router-dom"
import { SocketContext } from "../context/SocketContext";
import { useContext} from "react";
import LiveLocationMap from "../components/LiveLocationMap";
const Riding = () => {
  const location = useLocation();
  const {ride}= location.state || {};
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate('/home')
})
  
  
  

  return (
    <div className="h-screen ">
      <Link to='/home' className="fixed h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full ">
      <FaHome className=" text-lg font-bold" />
      </Link>

      <div className="h-1/2">
        <LiveLocationMap/>
        <div className="h-1/2 p-4">
        <div>
        <div className="flex items-center justify-between">
        <img
             className="h-12"
             src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
             alt="car"
           />

        <div className="text-right">
          <h2 className="text-lg capitalize font-medium">{ride?.captain.fullname.firstname + " "+ ride?.captain.fullname.lastname}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600"> Maruti Wagnor</p>
        </div>

        </div>
        

        <div className="flex justify-between gap-2 items-center flex-col">
          <div className="w-full flex flex-col gap-2 ">
            

            <div>
              <div className="flex gap-5  rounded-lg  border-b-2 p-3 ">
                <div className="flex items-center ">
                  <FaLocationCrosshairs className="text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-xl">62/11-A</h3>
                  <p className="-mt-1 text-gray-600 text-lg">
                    {ride?.destination}
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
                  <h3 className="font-medium text-xl"> ₹{ride?.fare}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <button className="w-full mt-5 bg-green-500 font-medium text-white p-2 rounded-lg  "> Make a Payment</button>

        </div>
      </div>
    </div>
  );
};

export default Riding;
