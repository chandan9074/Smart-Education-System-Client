import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CourseContent from "./CourseContent";

const CourseDetails = () => {
  const courseId = useParams();
  document.title = `${courseId.id} -All Contents`;
  const [contents, setContents] = useState([1, 2, 3]);

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
                Course Code: {courseId.id}
              </h4>
              <h4 className='text-xl font-medium'>Section: A</h4>
              <h4 className='text-xl font-medium'>
                Instructor: Sumit Kumer Bangshal
              </h4>
              <p className='text-xl font-medium'>Lecturer</p>
              <p className='text-xl font-medium'>Science</p>
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

      <section className='container mb-5 '>
        <Accordion>
          {contents.map((content, index) => (
            <Accordion.Item className='my-4 shadow-sm' eventKey={index}>
              <CourseContent />
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default CourseDetails;
