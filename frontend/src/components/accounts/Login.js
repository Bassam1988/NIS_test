import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginUser } from "../../redux/actions/auth";

function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [username, setUnserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(username, password));
  };

  return (
    !isAuthenticated ? (
    <div className="col-md-6 m-auto container">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="validationServer02">User Name</label>
            <input
              type="text"
              className="form-control "
              id="validationServer03"
              onChange={(e) => setUnserName(e.target.value)}
              value={username}
              required
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  ) :(<Redirect to="/dashboard"/>))
}

export default Login;
