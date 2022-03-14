import React from "react";
import Course from "../Courses/Course";

const Dashboard = () => {
  return (
    <div>
      <section className='my-5 pt-5 bg-gray-50'>
        <div className='input-group w-50 mb-3 mx-auto py-5'>
          <input
            type='text'
            className='form-control'
            placeholder='search with course name'
            aria-describedby='button-addon2'
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
          <div className='d-flex justify-content-between align-items-center py-3'>
            <h3>Recently Visited</h3>
            <a href='#all_course' className='text-decoration-none text-dark'>
              <h6>View all</h6>
            </a>
          </div>
          <div className='row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4'>
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
          </div>
          <p className="text-2xl font-semibold">No Courses Available</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
