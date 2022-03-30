import { InboxOutlined } from "@ant-design/icons";
import { DatePicker, Input, message, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { addHomework } from "../../../services/others";
import "../../../index.css";
import { useNavigate } from "react-router-dom";

const AddHomework = () => {
  const { Dragger } = Upload;

  const [homeworkDetails, setHomeworkDetails] = useState(initialData);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("User Details")).type);
    if (
      !(JSON.parse(localStorage.getItem("User Details")).type === "teacher")
    ) {
      navigate("/dashboard");
    }
  }, []);

  const loadData = (e) => {
    const data = { ...homeworkDetails };
    data[e.target.id] = e.target.value;
    setHomeworkDetails(data);
  };

  function onChange(value, dateString) {
    const data = { ...homeworkDetails };
    data["due_time"] = dateString;
    setHomeworkDetails(data);
  }

  const props = {
    onChange(info) {
      setFile(info.file.originFileObj);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("title", homeworkDetails.title);
    form_data.append("instruction", homeworkDetails.instruction);
    form_data.append("question", homeworkDetails.question);
    form_data.append("file", file);
    form_data.append("total_marks", homeworkDetails.total_marks);
    form_data.append("due_time", homeworkDetails.due_time.slice(0, 16));
    form_data.append("course_content", homeworkDetails.course_content);

    const homework = await addHomework(form_data);

    if (homework.status === 200) {
      message.success("Homework added successfully");
      setHomeworkDetails(initialData);
    } else {
      console.log(homework);
    }
  };

  return (
    <div className='min-h-screen pt-20 mx-6 md:mx-32 md:pt-28'>
      <div className='bg-white px-14 py-16 shadow-sm rounded'>
        <div>
          <h1 className='text-2xl font-medium text-center pb-6'>
            Add Homework
          </h1>
          <p className='text-center mb-0 font-medium text-sm'>Title</p>
          <h1 className='max-w-md text-2xl font-medium text-center mx-auto'>
            <Input
              placeholder='Add Title'
              name='instruction'
              id='title'
              onChange={(e) => loadData(e)}
              value={homeworkDetails.title}
            />
          </h1>
        </div>
        <div>
          <div className='mt-6'>
            <div>
              <div className='flex justify-between items-center'>
                <p className='text-lg font-medium'>Question Details:</p>
                <p className='text-lg font-medium'>
                  <span className='text-sm font-medium'>Total Marks: </span>
                  <span>
                    <Input
                      placeholder='Total Marks'
                      name='total_marks'
                      id='total_marks'
                      onChange={(e) => loadData(e)}
                      value={homeworkDetails.total_marks}
                    />
                  </span>
                </p>
              </div>
              <p>
                <span className='font-medium text-sm'>Instruction: </span>
                <span>
                  <Input
                    placeholder='Instructions'
                    name='instruction'
                    id='instruction'
                    onChange={(e) => loadData(e)}
                    value={homeworkDetails.instruction}
                  />
                </span>
              </p>
              <p>
                <span className='font-medium text-sm'>Question: </span>
                <span>
                  <TextArea
                    placeholder='Question'
                    name='question'
                    id='question'
                    onChange={(e) => loadData(e)}
                    value={homeworkDetails.question}
                  />
                </span>
              </p>

              <div className='py-4'>
                <div>
                  <Dragger {...props} multiple={false}>
                    <p className='ant-upload-drag-icon'>
                      <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-sm font-medium'>Submission Details</p>

              <div className='bg-gray-50 mb-4'>
                <div className='font-medium p-3'>
                  <span className='text-sm font-medium'>Due Date:</span>
                  <span className='ml-4'>
                    <DatePicker showTime onChange={onChange} />
                  </span>
                </div>
                <p className='font-medium p-2'> </p>
              </div>

              <div className='w-full flex justify-center items-center pt-6'>
                <button
                  className='mx-auto color-secendary px-6 py-1.5 shadow-sm rounded font-semibold'
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHomework;

const initialData = {
  title: "",
  instruction: "",
  question: "",
  total_marks: "",
  due_time: "",
  file: "",
  course_content: 3,
};
