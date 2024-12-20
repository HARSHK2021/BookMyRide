import React,{useContext} from "react";
import { FiClock } from "react-icons/fi";
import { GiSpeedometer } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainDetails = () => {
  const {captain} = React.useContext(CaptainDataContext)
  // console.log("captain",captain)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7c15mqbUC9Ube6XGhKYSsY9KC2v76CwEJA&s"
            alt=""
          />
          <h4 className="text-lg capitalize font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold "> ₹378.20 </h4>
          <p className="text-sm font-medium text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex p-3 justify-center gap-5 items-center bg-gray-200 rounded-lg  mt-5 ">
            <div className="text-center ">
            <FiClock  className="text-3xl font-thin inline mb-2 "  />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
            </div>
            <div className="text-center">
            <GiSpeedometer className="text-3xl font-thin inline mb-2" />


            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
            </div>
            <div className="text-center">
            <GrNotes className="text-2xl font-thin inline mb-2" />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
            </div>
          </div>



    </div>
  );
};

export default CaptainDetails;
