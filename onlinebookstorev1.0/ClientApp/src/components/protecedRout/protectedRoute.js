import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRout = ({ isAuth, Component, ...rest }) => {
  console.log("from protected rout", rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};
