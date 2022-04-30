import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import Icons from "../../components/Icons";
import { coursewiseHomeworkProgresses } from "../../services/others";

const ProgressDetails = () => {
  const courseId = useParams();

  const [homeworkResult, setHomeworkResult] = useState([]);

  useEffect(() => {
    (async () => {
      const resultResp = await coursewiseHomeworkProgresses(
        JSON.parse(localStorage.getItem("student"))?.username
      );
      console.log(resultResp.data);
      if (resultResp.data) {
        setHomeworkResult(resultResp.data);
      }
    })();
  }, [courseId?.id]);

  const data = [["homework", "Result", "Total Marks"]];
  homeworkResult.map((res, index) => {
    if (
      res?.homework_no?.course_content?.courses?.id === parseInt(courseId.id)
    ) {
      data.push([
        `${res?.homework_no?.title} (${(
          (parseFloat(res.marks) / parseFloat(res?.homework_no?.total_marks)) *
          100
        ).toFixed(2)}%)`,
        parseFloat(res.marks),
        parseFloat(res?.homework_no?.total_marks),
      ]);
    }
  });
  console.log(data);
  const options = {
    hAxis: { title: "Homeworks", minValue: 0 },
    vAxis: { title: "Marks", minValue: 0 },
    legend: "none",
    trendlines: {
      0: {
        type: "polynomial",
        degree: 3,
        visibleInLegend: true,
        labelInLegend: "Trend",
      },
    },
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    enableInteractivity: false,
  };

  console.log(homeworkResult);

  return (
    <div className='pt-24'>
      {data.length > 1 ? (
        <div className='container my-8 p-8 bg-white rounded shadow-sm'>
          <div className='relative'>
            <h1 className='text-center text-2xl mb-6'>Result of Homeworks</h1>
            <div>
              <Icons.IButton
                className='w-4 absolute -top-2 right-2'
                title='These are classise yearly results'
              />
            </div>
          </div>
          <div>
            <Chart
              chartType='ScatterChart'
              width='100%'
              height='400px'
              data={data}
              options={options}
            />
          </div>
        </div>
      ) : (
        <div className='container my-8 p-8 bg-white rounded shadow-sm'>
          <h1 className='text-center text-2xl mb-6'>
            No Homeworks Assigned or Not Evaluated Yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProgressDetails;
