import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStudentsYearlyResult } from "../../services/auth";
import { Chart } from "react-google-charts";

const Progrecesses = () => {
  const student = useParams();
  const [yearlyResults, setYearlyResults] = useState([]);

  useEffect(() => {
    (async () => {
      const yresults = await loadStudentsYearlyResult(student.username);
      if (yresults.data) {
        setYearlyResults(yresults.data);
      }
    })();
  }, []);

  console.log(yearlyResults);

  const data = [["Classes", "Result", "Total Marks"]];

  for (let i = 1; i < 11; i++) {
    if (
      yearlyResults.find((res) => parseInt(res.class_name.class_name) === i)
    ) {
      const ifRes = yearlyResults.find(
        (res) => parseInt(res.class_name.class_name) === i
      );
      console.log(ifRes);
      console.log(i);
      data.push([
        `${i} (${ifRes.percentage}%)`,
        parseFloat(ifRes.marks),
        parseFloat(ifRes.total_marks),
      ]);
    } else {
      console.log(i);

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
      <div className='container h-96 mt-8 p-8 bg-white'>
        <h1 className='text-center text-2xl mb-6'>Classwise Results</h1>
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
    </div>
  );
};

export default Progrecesses;
