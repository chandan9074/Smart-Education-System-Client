import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import {
  deleteCourseContent,
  loadStudentsCourseContents,
  postStudentsCourseContent,
} from "../../services/auth";
import CourseContent from "./CourseContent";
import { useForm } from "react-hook-form";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CourseDetails = () => {
  const courseId = useParams();
  const location = useLocation();
  const { courseData } = location.state;
  const [contents, setContents] = useState([]);
  const [files, setFiles] = useState([]);
  const [togglePost, setTogglePost] = useState(true);
  const [userData, setUserData] = useState({});
  const [toggleDelete, setToggleDelete] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
    setUserData(JSON.parse(localStorage.getItem("User Details")));
  }, [togglePost, toggleDelete]);

  const fetchData = async () => {
    const response = await loadStudentsCourseContents(courseId.id);
    // console.log("response", response.data);
    setContents(response.data);
  };

  const handleContentDelete = async (id) => {
    const deleteRes = await deleteCourseContent(id);
    setToggleDelete(!toggleDelete);
  };

  const onFinish = async (values) => {
    const { title, details, links, video } = values;
    const contentData = {
      title: title,
      details: details,
      links: links,
      courses: courseId.id,
    };
    console.log(video);

    const response = await postStudentsCourseContent(contentData, video, files);
    setTogglePost(!togglePost);
    form.resetFields();
  };

  const props = {
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setFiles(fileList);
        // console.log("filelisht", fileList);
      }
    },
  };

  return (
    <div>
      <section>
        <div className='container my-5 pt-4'>
          <div
            className='
              container
              d-flex
              justify-content-evenly
              bg-white
              py-5
              mx-auto
              rounded-3
            '
          >
            <div className='my-auto'>
              <h4 className='text-xl font-medium'>
                Course Title: {courseData.title}
              </h4>
              <h4 className='text-xl font-medium'>
                Course Code: {courseData.course_code}
              </h4>
              <h4 className='text-xl font-medium'>
                Section: {courseData.classes[0].class_sec.section}
              </h4>
              <h4 className='text-xl font-medium'>
                Instructor: {courseData.instructor.user.first_name}{" "}
                {courseData.instructor.user.last_name}
              </h4>
            </div>
            <div className='image my-auto'>
              <img
                className='m-auto rounded'
                src='http://localhost:3000/static/media/course.1003354d4f4b8485fdfa.png'
                alt=''
                height='220vh'
                width='220vh'
              />
            </div>
          </div>
        </div>
      </section>
      <hr className='container pt-1 my-5' />
      <section className='container flex justify-center'>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-gray-150 p-5 flex flex-col w-3/4 rounded">
          <h3 className="text-3xl font-semibold text-center">Add Course Content</h3>
          <label className="text-xl font-semibold mb-2">Title</label>
          <input type="text" {...register("title")} placeholder="Enter the content title" className="p-3 rounded mb-4 border-2 border-blue-200" />
          <label className="text-xl font-semibold mb-2">Details</label>
          <textarea type="text" {...register("details")} placeholder="Enter the content details" className="p-3 rounded mb-4 resize-none border-2 border-blue-200 h-40" /> */}

        {userData.type === "teacher" && (
          <Form
            form={form}
            name='dynamic_form_nest_item'
            onFinish={onFinish}
            autoComplete='off'
            className='bg-white'
            style={{
              border: "1px solid #dbd7d7",
              padding: "60px",
              display: "flex",
              flexDirection: "column",
              width: "75%",
              borderRadius: 5,
            }}
          >
            <div className='w-full flex justify-center'>
              <h1 className='text-xl font-semibold'>Add Course Content</h1>
            </div>
            <label style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
              Title
            </label>
            <Form.Item
              name='title'
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input
                style={{
                  padding: 16,
                  border: "2px solid #bfdbfe",
                  borderRadius: 4,
                }}
                placeholder='Enter the content title'
              />
            </Form.Item>

            <label style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
              Details
            </label>
            <Form.Item
              name='details'
              rules={[
                { required: true, message: "Please input your details!" },
              ]}
            >
              <TextArea
                style={{
                  padding: 16,
                  marginBottom: 15,
                  border: "2px solid #bfdbfe",
                  borderRadius: 4,
                  resize: "none",
                  height: 150,
                }}
                placeholder='Enter the content details'
              />
            </Form.Item>

            <label style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
              YouTube Video Link
            </label>
            <Form.List name='video'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align='baseline'
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        rules={[{ required: false }]}
                      >
                        <Input placeholder='Enter video title' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "video_link"]}
                        rules={[{ required: false }]}
                      >
                        <Input placeholder='Enter video link' />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add video field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <label style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
              Other links
            </label>
            <Form.Item name='links' rules={[{ required: false }]}>
              <TextArea
                style={{
                  padding: 16,
                  marginBottom: 15,
                  border: "2px solid #bfdbfe",
                  borderRadius: 4,
                  resize: "none",
                  height: 150,
                }}
                placeholder='Enter other links'
              />
            </Form.Item>

            <label style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
              File
            </label>

            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  htmlType='submit'
                  style={{
                    width: "25%",
                    backgroundColor: "#4eeb8a",
                    height: "40px",
                    borderRadius: 5,
                    fontSize: "16px",
                    fontWeight: 500,
                    marginTop: "40px",
                  }}
                >
                  Save
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}

        {/* <label className="text-xl font-semibold mb-2">Other Links</label>
          <textarea type="text" {...register("links")} placeholder="Enter the content links" className="p-3 rounded mb-4 resize-none border-2 border-blue-200  h-40" />
          <label className="text-xl font-semibold mb-2">File</label>
          <input type="file" {...register("files")} />

          {errors.exampleRequired && <span>This field is required</span>}
          
          <input type="submit" className="w-1/4 rounded text-base mx-auto mt-5 p-2 font-semibold color-secendary" />
        </form> */}
      </section>

      <section className='container mb-5 '>
        {contents?.length ? (
          <Accordion>
            {contents?.map((content, index) => (
              <Accordion.Item className='my-4 shadow-sm' eventKey={index}>
                <CourseContent
                  content={content}
                  userData={userData}
                  handleContentDelete={handleContentDelete}
                  onFetchData={fetchData}
                />
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <h2 className='text-xl text-center'>No contents added yet</h2>
        )}
      </section>
    </div>
  );
};

export default CourseDetails;
