import React, { useEffect, useState } from "react";
import { loadClasswiseCourses } from "../../services/auth";
import Course from "../Courses/Course";

const Dashboard = () => {
  document.title = "Dashboard -All Courses";

  const [courses, setCourses] = useState([]);
  const [searchCourses, setSearchCourses] = useState([]);
  const [ToggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    (async () => {
      const classwiseCourses = await loadClasswiseCourses();
      if (classwiseCourses.status === 200) {
        setCourses(classwiseCourses.data);
      }
    })();
  }, [ToggleSearch]);

  const handleSearchCourse = (e) => {
    if (e.target.value === "") {
      setToggleSearch(!ToggleSearch);
    } else {
      setCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  return (
    <div>
      <section className='my-5 pt-5 bg-gray-50'>
        <div className='input-group w-50 mb-3 mx-auto py-5'>
          <input
            type='text'
            className='form-control'
            placeholder='search with course name'
            aria-describedby='button-addon2'
            onChange={(e) => {
              handleSearchCourse(e);
            }}
          />
          <button
            className='btn btn-outline color-secendary mx-2 '
            type='button'
            id='button-addon2'
          >
            <i className='fas fa-search'></i>
          </button>
        </div>
        <div className='recently_visited container'>
          <div className='row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4'>
            {courses.length ? (
              courses.map((course) => (
                <Course key={course.id} course={course} linkTo={"/course"} />
              ))
            ) : (
              <p className='text-2xl font-semibold'>No Courses Available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
