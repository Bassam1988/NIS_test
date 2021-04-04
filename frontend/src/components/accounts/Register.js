import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createMessage } from "../../redux/actions/messages";
import { registerUser } from "../../redux/actions/auth";

function Register() {
  const [username, setUnserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [groups, setGroup] = useState([]);
  const [aboutMe, setAboutMe] = useState("");
  const [location, setLocation] = useState("");
  const [birth_day, setBirthDay] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
    } else {
      const uploadData = new FormData();
      uploadData.append("img", profilePicture, profilePicture.name);
     uploadData.append("bio", aboutMe);
      uploadData.append("location", location);
      uploadData.append("birth_date", birth_day);
     const newUser = new FormData();
      newUser.append("first_name", first_name);
      newUser.append("last_name", last_name);
      newUser.append("username", username);
      newUser.append("email", email);
      newUser.append("password", password);
      newUser.append("groups", groups);
      newUser.append("profile.img", profilePicture, profilePicture.name);
      newUser.append("profile.bio", aboutMe);
      newUser.append("profile.location", location);
      newUser.append("profile.birth_date", birth_day);
      
      /*const newUser = {
        first_name,
        last_name,
        username,
        email,
        password,
        groups,
        profile:{
          'bio':aboutMe,
          location,
          'birth_date': birth_day,
          'img':uploadData
         },
      };*/
      dispatch(registerUser(newUser));
    }
  };

  return !isAuthenticated ? (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="validationServer01">First name</label>
            <input
              type="text"
              className="form-control"
              id="validationServer01"
              onChange={(e) => setFirstName(e.target.value)}
              value={first_name}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="validationServer02">Last name</label>
            <input
              type="text"
              className="form-control"
              id="validationServer02"
              onChange={(e) => setLastName(e.target.value)}
              value={last_name}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="validationServer02">About me</label>
            <input
              type="text"
              className="form-control"
              
              onChange={(e) => setAboutMe(e.target.value)}
              value={aboutMe}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="validationServer02">Location</label>
            <input
              type="text"
              className="form-control"
              
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="validationServer02">BirthDay</label>
            <input
              type="text"
              className="form-control"
              
              onChange={(e) => setBirthDay(e.target.value)}
              value={birth_day}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="validationServer02">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              
              onChange={(e) => setProfilePicture(e.target.files[0])}
              
              required
            ></input>
          </div>
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
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password confirm</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
            ></input>
          </div>
          <div className="radio" onChange={(e) => setGroup([e.target.value])}>
            <input type="radio" value="6" name="expType" /> Customer <br />
            <input type="radio" value="5" name="expType" /> Seller
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}

export default Register;
