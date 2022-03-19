import React from "react";
import { useParams } from "react-router-dom";

const ProgressDetails = () => {
  const courseId = useParams();
  return <div className='pt-24'>ProgressDetails: {courseId.id}</div>;
};

export default ProgressDetails;
