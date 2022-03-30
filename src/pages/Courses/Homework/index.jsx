import { Upload, message, Button, Menu, Dropdown } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { deleteHomework, loadHomework } from "../../../services/others";
import Icons from "../../../components/Icons";
import { UploadOutlined } from "@ant-design/icons";

const Homework = () => {
  const homeworId = useParams();
  const [homeworkDetails, setHomeworkDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const navigator = useNavigate();

  const { Dragger } = Upload;

  useEffect(() => {
    (async () => {
      const homework = await loadHomework(homeworId.id);

      if (homework.status === 200) {
        setHomeworkDetails(homework.data);
      } else {
        console.log(homework);
      }
    })();
    setUserDetails(JSON.parse(localStorage.getItem("User Details")));
  }, []);

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // const uploadProps = {
  //   onChange({ file, fileList }) {
  //     if (file.status !== "uploading") {
  //       console.log(file, fileList);
  //     }
  //   },
  // };

  const handleDelete = async () => {
    const homework = await deleteHomework(homeworId.id);
    console.log(homework);
    if (homework.status === 204) {
      message.success("Deleted successfully");
      navigator("/dashboard");
    } else {
      console.log(homework);
    }
  };

  const menu = (
    <Menu className='mt-16 z-50' style={{ zIndex: "9999" }}>
      <Menu.Item key='profile' className='color-secendary-hover'>
        <Link rel='noopener noreferrer' to={`/update-homework/${homeworId.id}`}>
          <div className='px-4 font-semibold'>Edit</div>
        </Link>
      </Menu.Item>
      <Menu.Item key='settings' className='color-secendary-hover'>
        <div>
          <div className='px-4 font-semibold' onClick={() => handleDelete()}>
            Delete
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='min-h-screen pt-20 mx-6 md:pt-28 md:mx-32'>
      <div className=' bg-white px-8 py-10 md:px-14 md:py-16 shadow-sm rounded'>
        <div className='relative'>
          <h1 className='text-2xl font-medium text-center underline pb-10'>
            {homeworkDetails.title}
          </h1>

          {userDetails.type === "teacher" && (
            <div>
              <Dropdown
                overlay={menu}
                placement='bottomRight'
                arrow
                trigger='[click]'
              >
                <div className='absolute top-0 right-0 py-2 px-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                  <Icons.ThreeDot className='w-1' />
                </div>
              </Dropdown>
            </div>
          )}
        </div>
        <div className='mt-6'>
          <div>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-medium'>Question:</p>
              <p className='text-lg font-medium'>
                <span>Total Marks: </span>
                <span>{homeworkDetails.total_marks}</span>
              </p>
            </div>
            <p>
              <span className='font-medium'>Instruction: </span>
              {homeworkDetails.instruction}
            </p>
            <p>{homeworkDetails.question}</p>
            {homeworkDetails.file && (
              <div className='py-4'>
                {userDetails.type === "student" ? (
                  <a
                    className='color-primary px-3 py-2 opacity-60 rounded shadow-sm text-white font-semibold my-auto'
                    href={`${homeworkDetails.file}.pdf`}
                    target='_blank'
                  >
                    <span>Download Question</span>{" "}
                    <Icons.DownArrow className='w-3 inline mb-0.5' />
                  </a>
                ) : (
                  <div>
                    <span className='font-medium'>File: </span>
                    <a
                      className='text-primary font-semibold my-auto'
                      href={`${homeworkDetails.file}.pdf`}
                      target='_blank'
                    >
                      <span>{`${homeworkDetails.file}.pdf`.substring(77)}</span>{" "}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='mt-4'>
            <p className='text-lg font-medium'>Submission Details</p>
            {userDetails.type === "student" && (
              <>
                <div className='bg-gray-50 mb-4'>
                  <div className='font-medium p-3'>
                    <span>Submission status: </span>
                    <span className='ml-4'>Not Submitted </span>
                  </div>
                </div>
                <div className='bg-gray-50 mb-4'>
                  <div className='font-medium p-3'>
                    <span>Marks:</span>
                    <span className='ml-4'></span>
                  </div>
                </div>
              </>
            )}

            <div className='bg-gray-50 mb-4'>
              <div className='font-medium p-3'>
                <span>Due Date:</span>
                <span className='ml-4'>
                  {`${homeworkDetails.due_time}`.slice(0, 19)}
                </span>
              </div>
              <p className='font-medium p-2'> </p>
            </div>
            {userDetails.type === "student" && (
              <>
                <div className='bg-green-50 mb-4'>
                  <div className='font-medium p-3'>
                    <p>Submission File:</p>
                    <span className='ml-4'>
                      {/* <input type='file' name='Submission File' id='' /> */}
                      <Dragger {...props}>
                        <p className='ant-upload-drag-icon'>
                          <InboxOutlined />
                        </p>
                        <p className='ant-upload-text'>
                          Click or drag file to this area to upload
                        </p>
                        <p className='ant-upload-hint'>
                          Support for a single or bulk upload. Strictly prohibit
                          from uploading company data or other band files
                        </p>
                      </Dragger>
                    </span>
                  </div>
                  <p className='font-medium p-2'> </p>
                </div>
                <div className='bg-green-50 mb-4'>
                  <div className='font-medium p-3'>
                    <p>Answer:</p>
                    <textarea
                      className='w-full p-4'
                      name=''
                      id=''
                      cols='30'
                      rows='10'
                      placeholder='Answer'
                    ></textarea>
                  </div>
                </div>
                <div className='w-full flex justify-center items-center pt-6'>
                  <button className='mx-auto color-secendary px-6 py-1.5 shadow-sm rounded font-semibold'>
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
