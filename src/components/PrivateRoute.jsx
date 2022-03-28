import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

export default function PrivateRoute({
  // component: Component,
  // permit,
  // ...rest
  children
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to='/signin' />;
  // return (
  //   <Routes>
  //     <Route
  //       {...rest}
  //       // render={() => {
  //       //   if (token) {
  //       //     return children;
  //       //   } else {
  //       //     return <Navigate to='/signin' />;
  //       //   }
  //       // }}

  //       render={(props) => {
  //         console.log(token);
  //         if (token) {
  //           console.log("IFFFF");
  //           return <Component {...props} />;
  //         } else {
  //           console.log("ELSEEEE");
  //           navigate("/signin");
  //           // return <Navigate to='/signin' />;
  //         }
  //       }}
  //     ></Route>
  //   </Routes>
  // );
}
