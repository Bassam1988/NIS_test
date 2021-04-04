import React, { createFactory } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function SellerRoute({ component: Component, path, ...rest }) {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading ...</h2>;
        } else if (!auth.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
        } else {
          if (auth.user.groups[0] != 6) return <Component {...props} />;
          else return (<p>You are not authorized for this operation</p>)
        }
      }}
    />
  );
}

export default SellerRoute;
