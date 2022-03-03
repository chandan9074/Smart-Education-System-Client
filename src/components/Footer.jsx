import React from "react";

const Footer = () => {
  return (
    <div className='color-primary text-white mt-20'>
      <div
        className='
          w-100
          container-fluid
          bg_lightgreen
          d-flex
          justify-content-around
          align-items-center
        '
      >
        <div className='ft_child w-25 mt-5 mb-auto'>
          <div className='footer_logo mb-3'>S.E.S</div>
          <p>
            We provide trainers, learners, and others involved in education with
            information, tools and resources to support and enhance education
            delivery and management.
          </p>
        </div>

        <div className='ft_child w-25 mt-5 mb-auto'>
          <h4>Destiny</h4>
          <ul>
            <li>Learn</li>
            <li>Practice</li>
            <li>Test</li>
            <li>Share</li>
          </ul>
        </div>
        <div className='ft_child w-25 mt-5 mb-auto'>
          <h4 className='mb-4'>For any Support</h4>
          <div>
            <div>
              <p>
                <i className='fas fa-map-marked-alt pe-2'></i>Mirpur Road,
                Dhanmondi 27, Dhaka.
              </p>
              <p>
                <i className='fas fa-envelope pe-2'></i>elearnteam@gmail.com
              </p>
              <p>
                <i className='fas fa-phone-alt pe-2'></i>01475585885
              </p>
            </div>
            <div className='mt-2 flex flex-col justify-center items-start'>
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
      <h6 className='text-center bg_lightgreen pb-4 py-4 m-0 fw-normal'>
        S.E.S ©2022. All rights reserved to S.E.S
      </h6>
    </div>
  );
};

export default Footer;
