import React from "react";
import { useParams } from "react-router-dom";

const Progrecesses = () => {
  const student = useParams();
  console.log(student);
  return <div className="min-h-screen pt-16">Progrecesses: {student.username}</div>;
};

export default Progrecesses;
