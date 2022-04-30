import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import Icons from "../../components/Icons";
import {
  loadStudentsCourses,
  loadStudentsYearlyResult,
} from "../../services/auth";
import Course from "../Courses/Course";

const Progrecesses = () => {
  const student = useParams();
  const [yearlyResults, setYearlyResults] = useState([]);
  const [studentsCourses, setStudentsCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const yresults = await loadStudentsYearlyResult(student.username);
      if (yresults.data) {
        setYearlyResults(yresults.data);
      }

      const studentsCourses = await loadStudentsCourses(student.username);
      if (studentsCourses?.status === 200) {
        setStudentsCourses(studentsCourses.data);
      }
    })();
  }, [student.username]);

  const data = [["Classes", "Result", "Total Marks"]];

  for (let i = 1; i < 11; i++) {
    if (
      yearlyResults.find((res) => parseInt(res.class_name.class_name) === i)
    ) {
      const ifRes = yearlyResults.find(
        (res) => parseInt(res.class_name.class_name) === i
      );
      data.push([
        `${i} (${ifRes.percentage}%)`,
        parseFloat(ifRes.marks),
        parseFloat(ifRes.total_marks),
      ]);
    } else {
      data.push([`${i}`, 0, 0]);
    }
  }

  const options = {
    chart: {
      subtitle: "X-axis: Classes, Y-axis: Marks",
    },
  };

  return (
    <div className='min-h-screen pt-16'>
      <div className='container my-8 p-8 bg-white rounded shadow-sm'>
        <div className='relative'>
          <h1 className='text-center text-2xl mb-6'>Classwise Results</h1>
          <div>
            <Icons.IButton
              className='w-4 absolute -top-2 right-2'
              title='These are classise yearly results'
            />
          </div>
        </div>
        <div>
          <Chart
            chartType='Bar'
            width='100%'
            height='400px'
            data={data}
            options={options}
          />
        </div>
      </div>

      {/* Progress of individual courses */}
      <div className='container p-8 bg-white rounded shadow-sm'>
        <div className='relative mb-10'>
          <h1 className='text-center text-2xl mb-6'>Courses</h1>
          <div>
            <Icons.IButton
              className='w-4 absolute -top-2 right-2'
              title='Click on courses for details'
            />
          </div>
        </div>
        <div className='row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4'>
          {studentsCourses.length ? (
            studentsCourses.map((course) => (
              <Course
                key={course.id}
                course={course}
                linkTo={"/progress-details"}
              />
            ))
          ) : (
            <p className='text-2xl font-semibold'>No Courses Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progrecesses;
