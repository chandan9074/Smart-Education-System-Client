import { Upload, message, Button, Menu, Dropdown } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  deleteHomework,
  loadHomework,
  studentSubmissionHomework,
  submitHomework,
} from "../../../services/others";
import Icons from "../../../components/Icons";
import { UploadOutlined } from "@ant-design/icons";

const Homework = () => {
  const homeworId = useParams();
  const [homeworkDetails, setHomeworkDetails] = useState({});
  const [studentHomework, setStudentHomework] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [file, setFile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(false);
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
  }, [toggleSubmit]);

  useEffect(() => {
    (async () => {
      const homework = await studentSubmissionHomework(homeworId.id);

      if (homework.status === 200) {
        setStudentHomework(homework.data);
      } else {
        console.log(homework);
      }
    })();
  }, [toggleSubmit]);

  const props = {
    onChange(info) {
      setFile(info.file.originFileObj);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const form_data = new FormData();
    form_data.append("submission_time", dateTime);
    form_data.append("submitted_file", file);
    form_data.append("homework_no", homeworId.id);
    form_data.append("marks", "");
    form_data.append("answer", answer);
    form_data.append("student", parseInt(userDetails.id));

    const homework = await submitHomework(homeworId.id, form_data);

    if (homework.status === 200) {
      message.success("Homework submitted successfully");
      setAnswer("");
      setToggleSubmit(!toggleSubmit);
    } else {
      console.log(homework);
    }
  };
  console.log(studentHomework);

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
                {studentHomework?.submitted_file ? (
                  <div className='bg-green-100 mb-4'>
                    <div className='font-medium p-3'>
                      <span>Submission status: </span>
                      <span className='ml-4'>Submitted </span>
                    </div>
                  </div>
                ) : (
                  <div className='bg-red-50 mb-4'>
                    <div className='font-medium p-3'>
                      <span>Submission status: </span>
                      <span className='ml-4'>Not Submitted </span>
                    </div>
                  </div>
                )}
                <div className='bg-gray-50 mb-4'>
                  <div className='font-medium p-3'>
                    <span>Marks:</span>
                    <span className='ml-4'>{studentHomework?.marks}</span>
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
                      </Dragger>
                      {studentHomework?.submitted_file && (
                        <p className='pt-2'>
                          <span className='font-medium mr-2'>
                            Your Submitted file:
                          </span>
                          <a href={`${studentHomework?.submitted_file}.pdf`}>
                            {`${studentHomework?.submitted_file?.slice(
                              68
                            )}.pdf`}
                          </a>
                        </p>
                      )}
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
                      value={answer}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>

                {studentHomework?.submitted_file ? (
                  <div className='w-full flex justify-center items-center pt-6'>
                    <button
                      className='mx-auto color-secendary cursor-not-allowed opacity-80 px-6 py-1.5 shadow-sm rounded font-semibold'
                      disabled
                    >
                      Submitted
                    </button>
                  </div>
                ) : (
                  <div className='w-full flex justify-center items-center pt-6'>
                    <button
                      className='mx-auto color-secendary px-6 py-1.5 shadow-sm rounded font-semibold'
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </>
            )}

            {userDetails.type === "teacher" && (
              <div>
                <Link
                  to={`/evaluate-homework/${homeworId.id}`}
                  className='w-full flex justify-center items-center pt-6 text-black'
                >
                  <button className='mx-auto color-secendary px-6 py-1.5 shadow-sm rounded font-semibold'>
                    Evaluate Submissions
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
