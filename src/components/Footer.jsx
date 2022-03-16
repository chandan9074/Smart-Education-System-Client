import React from "react";

const Footer = () => {
  return (
    <div className='color-primary text-white mt-20 px-8 md:px-14 md:py-6'>
      <div className='w-100 container-fluid grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='text-justify mt-5 mx-auto'>
          <div className='mb-3 flex justify-center md:justify-start items-center text-xl font-semibold'>
            S.E.S
          </div>
          <p>
            We provide trainers, learners, and others involved in education with
            information, tools and resources to support and enhance education
            delivery and management.
          </p>
        </div>

        <div className='mt-5 flex flex-col items-center mx-auto'>
          <h4 className='text-white flex justify-center md:justify-start items-center md:-ml-8 text-xl font-semibold mb-4'>
            Destiny
          </h4>
          <div className='grid grid-cols-4 md:grid-cols-1'>
            <p className='list-item'>Learn</p>
            <p className='list-item'>Practice</p>
            <p className='list-item'>Test</p>
            <p className='list-item'>Share</p>
          </div>
        </div>
        <div className=' mt-5 mx-auto'>
          <h4 className='text-white flex justify-center md:justify-start items-center mb-4 text-xl font-semibold'>
            For any Support
          </h4>
          <div>
            <div className='flex flex-col justify-center items-center md:block mb-4'>
              {/* <div className=''> */}
              <p>
                <i className='fas fa-map-marked-alt pe-2'></i>Mirpur Road,
                Dhanmondi 27, Dhaka.
              </p>
              <p>
                <i className='fas fa-envelope pe-2'></i>sesteam@gmail.com
              </p>
              <p>
                <i className='fas fa-phone-alt pe-2'></i>01475585885
              </p>
            </div>
            <div className='mt-2 flex flex-col justify-center items-center md:items-start'>
              <img
                src='https://i.ibb.co/G2fDPjw/Google-Play-Badge.png'
                alt=''
              />
              <img
                className='mt-1'
                src='https://i.ibb.co/92hb6Q9/App-Store-Badge.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <h6 className='text-white text-center bg_lightgreen pb-4 py-4 font-light'>
        S.E.S ©2022. All rights reserved to S.E.S
      </h6>
    </div>
  );
};

export default Footer;
