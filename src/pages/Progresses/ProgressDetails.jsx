import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProgressDetails = () => {
  const student = useParams();
  const [yearlyResults, setYearlyResults] = useState([]);
  const [studentsCourses, setStudentsCourses] = useState([]);

  useEffect(() => {
    // (async () => {
    //   const yresults = await loadStudentsYearlyResult(student.username);
    //   if (yresults.data) {
    //     setYearlyResults(yresults.data);
    //   }
    //   const studentsCourses = await loadStudentsCourses(student.username);
    //   if (studentsCourses?.status === 200) {
    //     setStudentsCourses(studentsCourses.data);
    //   }
    // })();
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

  const courseId = useParams();
  return <div className='pt-24'>ProgressDetails: {courseId.id}</div>;
};

export default ProgressDetails;
