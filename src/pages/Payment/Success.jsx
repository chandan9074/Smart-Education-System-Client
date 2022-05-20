import React from "react";
import { Link } from "react-router-dom";
import success from "../../assets/GIF/success.gif";

const Success = () => {
  return (
    <div className='w-full pt-28 flex flex-col justify-center items-center'>
      <div className='p-4 shadow-sm rounded-md bg-white'>
        <img src={success} alt='' className='w-96' />
        <h1 className='text-xl text-center'>Successfully paid the fees.</h1>
      </div>
      <Link
        className='color-secendary px-6 py-1.5 shadow-sm rounded font-semibold mt-4 text-black'
        to={"/payment"}
      >
        Ok
      </Link>
    </div>
  );
};

export default Success;
