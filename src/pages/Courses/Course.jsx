import React from "react";
import { Link } from "react-router-dom";
import courseBg from "../../assets/Images/course.png";

const Course = ({ course, linkTo }) => {
  const classes = course?.classes;
  const assignedClasses = [];

  course?.classes.forEach((i) => {
    if (!assignedClasses.includes(i.class_sec.section)) {
      assignedClasses.push(i.class_sec.section);
    }
  });

  return (
    <div className='col'>
      <div
        className='card bg-white p-2 mx-auto shadow-sm'
        style={{ width: "17rem" }}
      >
        <Link
          to={`${linkTo}/${course.id}`}
          state={{ courseData: course }}
          className='text-decoration-none text-dark'
        >
          <img src={courseBg} className='card-img-top opacity-80' alt='...' />
        </Link>
        <div className='card-body flex justify-between'>
          <div className='mt-3 flex flex-col'>
            <a href='/dashboard' className='text-decoration-none text-dark'>
              <h6
                className='card-title font-semibold mb-1 text-truncate'
                style={{ maxWidth: "200px" }}
              >
                {course.title}
              </h6>
              <p>
                {course.course_code} (
                {assignedClasses.map((name) => " " + name + " ")})
              </p>
            </a>
            {/* <a
              id='1'
              className='color-secendary ml-auto -mr-32 px-3 py-2 text-3xl font-semibold hover:text-black cursor-pointer rounded-tl-full rounded-tr-full rounded-bl-full'
            >
              +
            </a> */}
          </div>
          <img
            src='https://www.seekpng.com/png/full/72-729756_how-to-add-a-new-user-to-your.png'
            className='w-16 h-16 absolute right-4 top-1/2 rounded-circle border-2'
            alt='instructor'
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
