import React from "react";
import {  Route,Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {


  const isAuthenticated = localStorage.getItem("authData");
  return (
    <>
      {
        isAuthenticated ?
        <Route
          {...restOfProps}
          render={(props) =>
            <Component {...props} />
          }
        />
        :
        <Redirect to="/" />
      }

    </>

  );
}

export default ProtectedRoute;