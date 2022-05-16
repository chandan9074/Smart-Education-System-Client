import React from "react";
import { Link } from "react-router-dom";
import success from "../../assets/GIF/success.gif";

const Success = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src={success} alt="" className="w-56" />
      <Link
        className="color-secendary px-6 py-1.5 shadow-sm rounded font-semibold mt-4 text-black"
        to={"/payment"}
      >
        Ok
      </Link>
    </div>
  );
};

export default Success;
