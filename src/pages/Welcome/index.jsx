import React from "react";
import { Link } from "react-router-dom";

const welcome = () => {
  return (
    <div>
      <main>
        <section className='container my-5 pt-5'>
          <div className='row pt-5'>
            <div className='w-10/12 mx-auto md:w-1/2 md:mx-auto col-md-5 col-12 col-sm-12'>
              <h6 className='text-2xl font-bold mb-12'>
                Are you ready to Learn?
              </h6>
              <h1 className='text-lg font-medium mb-4'>
                Learn Without
                <span className='text-lg text-secendary font-medium'>
                  {" "}
                  Limits
                </span>
              </h1>
              <p className='text-justify'>
                We provide learners, and others involved in education with
                contents, tools and resources to support and enhance knowledges
                and also evluate progrecess.
              </p>

              <button className='my-4 color-secendary font-semibold border-0 px-3 py-2 rounded-pill'>
                <Link className='text-black hover:text-black' to='/dashboard'>
                  Get Started
                </Link>
              </button>
            </div>

            <div className='col-12 col-md-5 mx-auto col-sm-12'>
              <div className='w-10/12 mx-auto md:w-full'>
                <img
                  src='https://i.ibb.co/2SP9wLh/1-P1-I4vj-NXUEc-G29-Ro-Lcnaug-unscreen.gif'
                  className='img-fluid'
                  width='900'
                  alt=''
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id='process'
          className='instalation_process container my-5 py-5'
        >
          <div className='book-section' id='books'></div>
          <div className='row'>
            <div className='col-md-3 col-12 col-sm-12'>
              <div className='box d-flex flex-column mb-3 align-items-center justify-content-center'>
                <div className='p-2 text-secendary-hover'>
                  <i className='fas fa-plus fa-5x'></i>
                </div>
                <div className='p-2'>
                  <h3>Step-1</h3>
                </div>
                <div className='pb-2'>
                  <p>Create Account</p>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-12 col-sm-6'>
              <div className='box d-flex flex-column mb-3 align-items-center justify-content-center'>
                <div className='p-2 text-secendary-hover'>
                  <i className='fas fa-signature fa-5x'></i>
                </div>
                <div className='p-2'>
                  <h3>Step-2</h3>
                </div>
                <div className='pb-2'>
                  <p>Sign in</p>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-12 col-sm-6'>
              <div className='box d-flex flex-column mb-3 align-items-center justify-content-center'>
                <div className='p-2 text-secendary-hover'>
                  <i className='fas fa-file-signature fa-5x'></i>
                </div>
                <div className='p-2'>
                  <h3>Step-3</h3>
                </div>
                <div className='pb-2'>
                  <p>Explore Courses</p>
                </div>
              </div>
            </div>
            <div className='col-md-3 col-12 col-sm-6'>
              <div className='box d-flex flex-column mb-3 align-items-center justify-content-center'>
                <div className='p-2 text-secendary-hover'>
                  <i className='far fa-play-circle fa-5x'></i>
                </div>
                <div className='p-2'>
                  <h3>Step-4</h3>
                </div>
                <div className='pb-2'>
                  <p>Course Materials</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='container my-5 pb-5'>
          <div className=' card text-center py-10'>
            <div className='card-body'>
              <h5 className='card-title text-xl font-medium'>
                Video Demonstration
              </h5>
              <p className='card-text italic mb-6'>
                Join the learning module to enhance your learning.
              </p>
              <iframe
                className='md:w-1/2 mx-auto'
                height='350'
                src='https://www.youtube.com/embed/wUaWNmL-Ztg'
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default welcome;
