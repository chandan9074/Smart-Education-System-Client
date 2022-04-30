import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { DatePicker, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { handleAuthenticateStudent } from "../../services/auth";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const VerifyStudent = () => {
  const naviator = useNavigate();

  const [studentInfo, setStudentInfo] = useState({
    username: "",
    dob: "",
  });


  const dateFormat = "YYYY/MM/DD";

  const customFormat = (value) => {
    console.log(value.format(dateFormat));
    const data = { ...studentInfo };
    data["dob"] = value.format(dateFormat);
    setStudentInfo(data);
  };

  const loadStudentInfo = (e) => {
    const data = { ...studentInfo };
    data[e.target.id] = e.target.value;
    setStudentInfo(data);
  };

  const handleStudentInfoSubmit = async (e) => {
    e.preventDefault();
    const athenticate = await handleAuthenticateStudent(studentInfo);
    if (athenticate.status === 200) {
      message.success({
        content: "Student's information Matched",
        className: "custom-class",
        style: {
          marginTop: "10vh",
        },
      });
      localStorage.setItem("student", athenticate.data?.username);
      naviator(`/progresses/${athenticate.data?.username}`);
    } else {
      message.error({
        content: "Wrong ID or Date of Birth",
        className: "custom-class",
        style: {
          marginTop: "10vh",
        },
      });
    }
  };

  return (
    <div className='min-h-screen pt-28 flex justify-center items-center'>
      <div className='bg-white px-14 py-10 rounded shadow-sm m-auto w-1/2 flex flex-col justify-center items-center'>
        <div className='mb-4'>
          <h3 className='text-2xl font-semibold mb-6'>
            Payment Smartly
          </h3>
          <div className='ml-2'>
            <ul className='list-disc list-inside'>
              <li>Secure Payment Information</li>
              <li>Multiple option for payment</li>
              {/* <li>Class Performance.</li>
              <li>Homework Performance.</li> */}
            </ul>
          </div>
        </div>
        <form
          onSubmit={(e) => handleStudentInfoSubmit(e)}
          className='w-1/2 mx-auto flex flex-col items-center'
        >
          <Input
            required
            className='mb-4 px-8 py-2 bg-white'
            placeholder='Enter student ID'
            id='username'
            onChange={(e) => loadStudentInfo(e)}
            prefix={<UserOutlined className='site-form-item-icon pr-2' />}
            suffix={
              <Tooltip title='ID provided from School'>
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <DatePicker
            id='dob'
            className='date-picker z-0'
            placeholder='Date of Birth'
            format={dateFormat}
            onChange={(e) => {
              customFormat(e);
            }}
          />

          <button
            className='color-secendary px-6 py-1.5 shadow-sm rounded font-semibold'
            type='submit'
          >
            Check
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyStudent;
