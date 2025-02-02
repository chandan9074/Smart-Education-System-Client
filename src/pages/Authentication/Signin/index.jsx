import React, { useState } from "react";
import { Input, message } from "antd";
import { handleSignin } from "../../../services/auth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  document.title = "S.E.S -Sign In";

  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const nevigate = useNavigate();

  const userData = (e) => {
    const userdata = { ...data };
    userdata[e.target.id] = e.target.value;
    setData(userdata);
    setError("");
  };

  const submitData = async (e) => {
    e.preventDefault();

    const responseData = await handleSignin(data);

    console.log(responseData.data);
    if (responseData.status === 200) {
      localStorage.setItem("User Details", JSON.stringify(responseData.data));
      localStorage.setItem("token", JSON.stringify(responseData.data.token));
      nevigate("/dashboard");
      message.success({
        content: "You have successfully signed in",
        className: "custom-class",
        style: {
          marginTop: "10vh",
        },
      });
    } else {
      message.error({
        content: "Invalid Username or Password.",
        className: "custom-class",
        style: {
          marginTop: "10vh",
        },
      });
    }
  };

  console.log(data);

  return (
    <div className='flex justify-center md:min-h-screen bg-gray-100 mt-12 px-4 md:px-0'>
      <div className='container my-12 max-w-xl border-2 border-gray-200 p-3 bg-white sm:mx-8 rounded-tl-lg rounded-br-lg'>
        <div className='flex w-11/12 lg:w-full mx-auto my-6'>
          <div className='w-1/3 mx-auto border-b-4 border-secendary text-black'>
            <div className='text-xl font-semibold py-2 text-center'>
              SIGN IN
            </div>
          </div>
        </div>

        <div className='m-6'>
          <form
            className='mb-4'
            onSubmit={(e) => {
              submitData(e);
            }}
          >
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
              >
                Institution ID
              </label>
              <input
                type='text'
                name='username'
                id='username'
                title='Sign in with yor institute id number'
                placeholder='Enter Your Institution ID'
                className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300'
                required
                onChange={(e) => {
                  userData(e);
                }}
              />
            </div>
            <div className='mb-6'>
              <div className='flex justify-between mb-2'>
                <label
                  htmlFor='password'
                  className='text-sm text-gray-600 dark:text-gray-400'
                >
                  Password
                </label>
                <a
                  href='/forget-password-email'
                  className='text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300'
                >
                  Forgot password?
                </a>
              </div>
              <Input.Password
                type='password'
                name='password'
                id='password'
                placeholder='Enter Your password'
                className='w-full password-field px-3 py-2 placeholder-gray-600 border bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                required
                onChange={(e) => {
                  userData(e);
                }}
              />
            </div>
            <p className='text-sm font-medium text-red-600 mb-4'>{error}</p>
            <div className='mb-6'>
              <button
                type='submit'
                className='w-full px-3 py-2 border border-gray-800 text-black font-semibold color-secendary rounded-md hover:opacity-90 focus:outline-none duration-100 ease-in-out'
              >
                Sign In
              </button>
            </div>
            <p className='text-sm text-center text-gray-400'>
              Don&#x27;t have an account yet?
              <a
                href='/signup/'
                className='font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline'
              >
                Sign up
              </a>
              .
            </p>
          </form>
          <div className='flex flex-row justify-center mb-8'>
            <span className='absolute bg-white px-4 text-gray-500'>
              or sign-in with
            </span>
            <div className='w-full bg-gray-200 mt-3 h-px'></div>
          </div>
          <div>
            <button className='w-1/3 mx-auto color-secendary-hover border border-green-600 rounded-md hover:opacity-90 focus:outline-none duration-100  text-black font-semibold p-2 flex flex-row justify-center gap-2 items-center ease-in-out'>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;