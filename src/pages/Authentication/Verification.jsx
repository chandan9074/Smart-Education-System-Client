import React from "react";

const Verification = () => {
  return (
    <div className='my-28'>
      <div className='flex flex-col items-center justify-center'>
        <img
          src='https://cdn.dribbble.com/users/778626/screenshots/5064153/verify.gif'
          width='150px'
          alt='.'
        />
        <h2 className='w-3/5 text-black text-center text-lg  my-4'>
          Your Registration Process has been done successfully. A verification
          mail has been sent to you e-mail addess.
        </h2>
        <div className='font-semibold text-center text-lg my-4'>
          Please verify email to active your account and stay connected with us.
        </div>
        <button className='px-4 py-2 font-medium bg-green-400 my-4'>
          <a href='https://mail.google.com/mail/u/0/#inbox' target='__blank'>
            Verify Email
          </a>
        </button>
      </div>
    </div>
  );
};

export default Verification;
