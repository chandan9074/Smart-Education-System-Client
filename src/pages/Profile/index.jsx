import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import correct from "../../assets/GIF/correct.gif";
import user from "../../assets/Images/user.png";
import { loadProfile } from "../../services/auth";
import { Modal } from "antd";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [editTogle, setEdtiTogle] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const profile = await loadProfile();

      if (profile) {
        setProfileDetails(profile);
      } else {
        console.log(profile);
      }
    })();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='container mb-5 pb-5'>
        <div className=' mx-auto pt-28'>
          <div className='main_profile_container w-75 mx-auto bg-white rounded-3 shadow p-5 col-md-offset-4'>
            <div className='d-flex justify-content-between'>
              <div className='flex items-center'>
                <h4 className='text-xl'>Profile</h4>
                {profileDetails?.user?.type === "teacher" ? (
                  <img className='ml-3' src={correct} width='20%' alt='' />
                ) : (
                  <img className='ml-3' src={user} width='20%' alt='' />
                )}
              </div>
              <div className='text-dark'>
                {/* onClick={()=>{setEdtiTogle(true);}} */}
                <i
                  className='fas fa-edit cursor-pointer'
                  onClick={showModal}
                ></i>
              </div>
            </div>
            <hr />
            <div className='d-flex flex justify-content-center py-5'>
              <div className='profile_details w-50 mx-5 my-auto'>
                <table>
                  <tbody className='text-base'>
                    <tr>
                      <td>
                        <p className='font-medium'>Name:</p>
                      </td>
                      <td className='pl-3 font-medium'>
                        <p>
                          {profileDetails?.user?.first_name}
                          {profileDetails?.user?.last_name}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='font-medium'>Email:</p>
                      </td>
                      <td className='pl-3 font-medium'>
                        <p>{profileDetails?.user?.email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='font-medium'>Institution ID:</p>
                      </td>
                      <td className='pl-3 font-medium'>
                        <p>{profileDetails?.user?.username}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='font-medium'>Address:</p>
                      </td>
                      <td className='pl-3 font-medium'>
                        <p>{profileDetails?.address}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='font-medium'>Date of Birth:</p>
                      </td>
                      <td className='pl-3 font-medium'>
                        <p>{profileDetails?.dob}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='font-medium'>Blood Group:</p>
                      </td>
                      <td className='pl-3 font-medium'>
                        <p>{profileDetails?.blood_group}</p>
                      </td>
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
            <div>
              <Modal
                title='Update Profile'
                visible={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCancel}
              >
                <div className='w-full d-flex flex justify-content-center py-5'>
                  <div className='mx-5 my-auto'>
                    <table>
                      <tbody className='text-sm'>
                        <tr>
                          <td>
                            <p className='font-medium'>First Name:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              placeholder='Your First Name'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              // onChange={(e) => loadData(e)}
                              value={profileDetails?.user?.first_name}
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <p className='font-medium'>Last Name:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              placeholder='Your Lasr Name'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              // onChange={(e) => loadData(e)}
                              value={profileDetails?.user?.last_name}
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <p className='font-medium'>Email:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              placeholder='Your Institution Email'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              // onChange={(e) => loadData(e)}
                              value={profileDetails?.user?.email}
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <p className='font-medium'>Institution ID:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              placeholder='Your Institution ID No.'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              // onChange={(e) => loadData(e)}
                              value={profileDetails?.user?.username}
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <p className='font-medium'>Address:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              placeholder='Your Address'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              // onChange={(e) => loadData(e)}
                              value={profileDetails?.address}
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <p className='font-medium'>Date of Birth:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              disabled
                              title='To change date of birth contact with administration office with required credentials'
                              placeholder='Your Date of Birth'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              // onChange={(e) => loadData(e)}
                              value={profileDetails?.dob}
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <p className='font-medium'>Blood Group:</p>
                          </td>
                          <td className='pl-3 font-medium'>
                            <input
                              type='text'
                              name='first_name'
                              id='first_name'
                              placeholder='Your Blood Group'
                              className='w-full px-3 py-2 placeholder-gray-600 border bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500'
                              value={profileDetails?.blood_group}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
