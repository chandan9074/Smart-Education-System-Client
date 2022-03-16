import React from "react";
import { Input, DatePicker, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";

const CheckProgresses = () => {
  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  // const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const dateFormat = "YYYY/MM/DD";

  const customFormat = (value) => {
    console.log(value.format(dateFormat));
  };

  return (
    <div className='min-h-screen pt-20 flex justify-center items-center'>
      <div className='bg-white px-14 py-10 rounded shadow-sm m-auto w-1/2 flex flex-col justify-center items-center'>
        <div className='mb-4'>
          <h3 className='text-2xl font-semibold mb-6'>
            Track all progresses in one place.
          </h3>
          <div className='ml-4'>
            <ul className='list-disc list-inside'>
              <li>Classwise Yearly Grades.</li>
              <li>Quizes Result.</li>
              <li>Class Performance.</li>
              <li>Homework Performance.</li>
            </ul>
          </div>
        </div>
        <form className='w-1/2 mx-auto flex flex-col items-center'>
          <Input
            className='mb-4 px-8 py-2'
            placeholder='Enter student ID'
            prefix={<UserOutlined className='site-form-item-icon pr-2' />}
            suffix={
              <Tooltip title='ID provided from School'>
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <DatePicker
            className='date-picker'
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
            Chack
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckProgresses;
