import { Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  loadSubmittedHomeworks,
  updateHomeworkMars,
} from "../../../services/others";

const EvaluateHomework = () => {
  const hwId = useParams();
  const [homeworks, setHomeworks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState("");
  const [markChange, setMarkChange] = useState("");
  const [markChangeToggle, setMarkChangeToggle] = useState(true);

  const showModal = (data) => {
    setIsModalVisible(true);
    setModalData(data);
  };

  const handleSubmit = async (id) => {
    console.log(id);
    console.log(markChange);
    if (markChange) {
      const homeworks = await updateHomeworkMars(id, markChange);
      console.log(homeworks);
      if (homeworks.status === 200) {
        message.success({
          content: "Evaluated successfully",
          className: "custom-class",
          style: {
            marginTop: "10vh",
          },
        });
        setMarkChange("");
        setMarkChangeToggle(!markChangeToggle);
      } else {
        console.log(homeworks);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const homeworks = await loadSubmittedHomeworks(hwId.id);
      if (homeworks.status === 200) {
        setHomeworks(homeworks.data);
      } else {
        console.log(homeworks);
      }
    })();
  }, [hwId.id, markChangeToggle]);

  console.log(markChange);

  return (
    <div className='min-h-screen py-20 mx-6 md:py-28 md:mx-32'>
      <div className=' bg-white px-8 py-10 md:px-14 md:py-16 shadow-sm rounded'>
        <div>
          {!homeworks.length && (
            <div className='w-10/12 md:w-full mx-auto'>
              <h1 className='font-semibold text-center text-black py-16 bg-white mt-12'>
                No One Submitted Yet
              </h1>
            </div>
          )}

          <div>
            {homeworks.map((hw, index) => (
              <div key={hw.id}>
                <div className='flex flex-col md:flex-row justify-between items-center w-11/12 lg:w-full mx-auto px-10 py-4 rounded-md shadow-md my-10 bg-green-500 bg-opacity-20'>
                  <div className='md:w-full flex flex-col md:flex-row flex-wrap justify-between items-center'>
                    <p className='w-1/6 text-center text-base font-semibold my-auto'>{index + 1}</p>
                    <div className='w-1/6 font-semibold text-center text-black hover:text-opacity-70'>
                      {hw?.student?.user?.username}
                    </div>
                    <div className='w-1/6'>
                      <a
                        className='mx-auto color-secendary text-sm px-2 py-1 rounded font-semibold text-black'
                        href={`${hw?.submitted_file}.pdf`}
                        target='_blank'
                      >
                        View File
                      </a>
                    </div>
                    <div className='w-1/6'>
                      <button
                        className='mx-auto color-secendary text-sm px-2 py-1 rounded font-semibold text-black'
                        onClick={() => showModal(hw?.answer)}
                      >
                        View Answer
                      </button>
                    </div>
                    <div className='w-1/6'>
                      <Input
                        className='marks-input'
                        placeholder={hw.marks ? hw.marks : "Marks"}
                        onChange={(e) => {
                          setMarkChange(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className='w-1/6 md:ml-24 flex justify-center items-center'>
                    <button
                      className='mx-auto color-secendary text-sm px-2 py-1 rounded font-semibold'
                      onClick={() => {
                        handleSubmit(hw.id);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Modal
              centered
              title='Written Answer'
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
              width={1000}
            >
              <p>{modalData}</p>
            </Modal>
          </div>
        </div>
        {/* {homeworks.map((hw) => (
          <p>{hw.answer}</p>
        ))} */}
      </div>
    </div>
  );
};

export default EvaluateHomework;
