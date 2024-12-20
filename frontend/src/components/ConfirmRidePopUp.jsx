import React, { useState } from "react";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

import OTPInput from "../components/OTPInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end">
        <IoMdClose
          onClick={() => {
            props.setConfirmRidePopupPanel(false);
          }}
          className="text-2xl"
        />
      </div>

      <h3 className="text-left text-2xl  font-semibold ">
        Confirm this to Start
      </h3>

      <div className="bg-yellow-400 rounded-lg p-3 mt-4 flex items-center justify-between border border-yellow-600 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://static.wikia.nocookie.net/b30b9ff3-a9f8-41a4-b620-87990cf3a233/scale-to-width/755"
            alt=""
          />
          <h3 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h3>
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
                <p className="-mt-1 text-gray-600 text-lg">cash cash</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex ">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className=" items-center ">
              <OTPInput setOtp={setOtp}></OTPInput>
            </div>

            <div className="flex items-center mt-5 gap-10">
              <button
                onClick={() => {
                  props.setConfirmRidePopupPanel(false);
                  props.setRidePopupPanel(false);
                }}
                className=" text-lg bg-red-600 font-medium text-white p-3 rounded-lg"
              >
                Cancel Ride
              </button>
              <button
                className="p-3 text-lg  flex justify-center  bg-green-400 font-medium text-white  rounded-lg"
              >
                Confirm Ride
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
