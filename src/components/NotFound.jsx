import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../assets/GIF/NotFoundGIF.gif";

const PageNotFound = () => {
  // this Component is for the wrong routes
  return (
    <div>
      <div className='flex flex-col items-center w-7/12 pb-16 mx-auto my-10 rounded-md'>
        <img width="70%" src={NotFound} alt='' />
        <Link
          to='/'
          className='color-secendary hover:text-black py-2 px-5 mt-2 rounded-full text-lack font-semibold'
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
