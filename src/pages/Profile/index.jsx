import React from "react";
import correct from "../../assets/GIF/correct.gif";
import user from "../../assets/Images/user.png";

const Profile = () => {
  return (
    <>
      <div className='container mb-5 pb-5'>
        <div className=' mx-auto mt-28'>
          <div className='main_profile_container w-75 mx-auto bg-white rounded-3 shadow p-5 col-md-offset-4'>
            <div className='d-flex justify-content-between'>
              <h4>
                Profile
                {/* Teacher */}
                <img className='' src={correct} width='15%' alt='' />
                {/* Stdents */}
                <img src={user} width='15%' alt='' />
              </h4>
              <a className='text-dark' href='/'>
                <i className='fas fa-edit pointer'></i>
              </a>
            </div>
            <hr />
            <div className='profile_container d-flex flex justify-content-center py-5'>
              <div className='profile_details w-50 mx-5 my-auto'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Name: </strong>
                      </td>
                      <td className='ps-3'></td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Roll:</strong>
                      </td>
                      <td className='ps-3'></td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email: </strong>
                      </td>
                      <td className='ps-3'></td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Class: </strong>
                      </td>
                      <td className='ps-3'></td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Section: </strong>
                      </td>
                      <td className='ps-3'></td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Profession: </strong>
                      </td>
                      <td className='ps-3'></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='profile_img w-50 '>
                <img
                  className='profile_img1 w-50 ms-md-5 mx-sm-auto pb-sm-0 pt-sm-2 my-md-auto rounded-circle'
                  src=''
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
