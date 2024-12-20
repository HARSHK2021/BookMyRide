import React, { useState, useRef } from "react";

const OTPInput = ({ setOtp }) => {
  const [otp, setLocalOtp] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/[^0-9]/.test(value)) return; // Allow only numeric input

    const newOtp = otp.split("");
    newOtp[index] = value;
    const updatedOtp = newOtp.join("");
    setLocalOtp(updatedOtp);
    setOtp(updatedOtp); // Pass OTP to parent component

    // Move to the next input field if value is filled
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    const newOtp = otp.split("");
    newOtp[index] = "";
    const updatedOtp = newOtp.join("");
    setLocalOtp(updatedOtp);
    setOtp(updatedOtp); // Pass OTP to parent component

    // Move to the previous input field
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index]) {
      handleBackspace(index);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").slice(0, 4);
    const newOtp = pastedData.split("").map((char, idx) => (/\d/.test(char) ? char : otp[idx] || ""));
    const updatedOtp = newOtp.join("");
    setLocalOtp(updatedOtp);
    setOtp(updatedOtp); // Pass OTP to parent component

    // Autofocus the next empty field
    const nextIndex = newOtp.findIndex((value) => value === "");
    if (nextIndex !== -1) {
      inputRefs.current[nextIndex].focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-md">
      <div className="flex gap-2">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index] || ""}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50"
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
