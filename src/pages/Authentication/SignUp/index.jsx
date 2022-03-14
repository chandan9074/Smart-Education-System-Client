import { message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { handleSignup } from "../../../services/auth";

const SignUp = () => {
  document.title = "S.E.S -Sign Up";

  const navigate = useNavigate();

  const [userdata, setUserdata] = useState(initialUserData);

  const [passwordChecker, setpasswordChecker] = useState(initialDesign);

  const loadData = (e) => {
    const data = { ...userdata };
    data[e.target.id] = e.target.value;
    setUserdata(data);
    setpasswordChecker({ color: "", display: "none" });
  };

  // Password Strength Checker
  const strength = zxcvbn(userdata.password);

  const bgColor = () => {
    switch (strength.score) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "#33FF66";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  // Password Strength Checker's style list
  const passStrengthClass = {
    width: `${(strength.score / 4) * 100}%`,
    height: "5px",
    marginTop: "5px",
    backgroundColor: bgColor(),
  };

  // Handeling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Confirm Password mathching Checker
    if (
      userdata.password === userdata.confirm_password &&
      userdata.confirm_password
    ) {
      // API Request
      const data = await handleSignup(userdata);

      if (data?.status === 201) {
        setUserdata(initialUserData);
        navigate("/verify");
      } else {
        message.error(data?.data.msg);
      }
    } else {
      setpasswordChecker({
        color: "red",
        display: "block",
      });

      setUserdata({
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        username: userdata.username,
        email: userdata.email,
        password: userdata.password,
        confirm_password: userdata.confirm_password,
      });
    }
  };
  return (
    <div className='flex justify-center min-h-screen bg-gray-100 mt-12 px-4 md:px-0'>
      <div className='container my-12 max-w-xl border-2 border-gray-200 p-3 bg-white sm:mx-8 rounded-tl-lg rounded-br-lg'>
        <div className='flex w-11/12 lg:w-full mx-auto my-6'>
          <Link className='w-full hover:text-black' to={"/signin"}>
            <div className=' py-2 text-center'>Sign In</div>
          </Link>
          <Link
            className='w-full border-b-4 border-secendary hover:text-black'
            to={"/signup"}
          >
            <div className='py-2 text-center'>Sign Up</div>
          </Link>
        </div>

        <div className='m-6'>
          <p className='text-gray-500 text-sm text-center italic py-2 mt-6 mb-10'>
            <span className='font-semibold'>
              “Live as if you were to die tomorrow. Learn as if you were to live
              forever.” - Mahatma Gandhi
            </span>
            <br /> Join us and make learing more easy and better.
          </p>
          <form
            className='mb-4'
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className='mb-6 flex'>
              <div className='w-1/2 mr-4'>
                <label
                  htmlFor='first_name'
                  className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
                >
                  First Name
                </label>
                <input
                  type='text'
                  name='first_name'
                  id='first_name'
                  placeholder='Your First Name'
                  className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                  onChange={(e) => loadData(e)}
                  value={userdata.first_name}
                />
              </div>

              <div className='w-1/2'>
                <label
                  htmlFor='last_name'
                  className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  name='last_name'
                  id='last_name'
                  placeholder='Your First Name'
                  className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                  onChange={(e) => loadData(e)}
                  value={userdata.last_name}
                />
              </div>
            </div>
            <div className='mb-6'>
              <label
                htmlFor='username'
                className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
              >
                Username
              </label>
              <input
                type='text'
                name='username'
                id='username'
                required
                placeholder='Your Username'
                className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                onChange={(e) => loadData(e)}
                value={userdata.username}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm text-gray-600 dark:text-gray-400'
              >
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Your email address'
                className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                onChange={(e) => loadData(e)}
                value={userdata.email}
              />
            </div>

            <div className='flex'>
              <div className='w-1/2 mb-6 mr-4'>
                <div className='flex justify-between mb-2'>
                  <label
                    htmlFor='password'
                    className='text-sm text-gray-600 dark:text-gray-400'
                  >
                    Password
                  </label>
                </div>
                <input
                  type='password'
                  name='password'
                  id='password'
                  required
                  placeholder='Your password'
                  className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                  onChange={(e) => loadData(e)}
                  value={userdata.password}
                />
                <div style={passStrengthClass} className='text-green-600' />
              </div>

              <div className='w-1/2 mb-6'>
                <div className='flex justify-between mb-2'>
                  <label
                    htmlFor='confirm_password'
                    className='text-sm text-gray-600 dark:text-gray-400'
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  type='password'
                  name='confirm_password'
                  id='confirm_password'
                  required
                  placeholder='Confirm Your password'
                  className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300'
                  onChange={(e) => loadData(e)}
                  value={userdata.confirm_password}
                />
                <div>
                  <p
                    className='absolute pl-1 font-semibold'
                    style={passwordChecker}
                  >
                    {userdata.password !== userdata.confirm_password &&
                      "Not Matched"}
                  </p>
                </div>
              </div>
            </div>

            <div className='mb-6'>
              <button
                type='submit'
                className='w-full px-3 py-2 border border-gray-800 text-black font-semibold color-secendary rounded-md hover:opacity-90 focus:outline-none duration-100 ease-in-out'
              >
                Sign Up
              </button>
            </div>
            <p className='text-sm text-center text-gray-400'>
              Already have an account ?
              <a
                href='/signin'
                className='font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline'
              >
                Sign in
              </a>
              .
            </p>
          </form>
          <div className='flex flex-row justify-center mb-8'>
            <span className='absolute bg-white px-4 text-gray-500'>
              or sign-up with
            </span>
            <div className='w-full bg-gray-200 mt-3 h-px' />
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

export default SignUp;

const initialUserData = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const initialDesign = {
  color: "",
  display: "none",
};
