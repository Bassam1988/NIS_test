import axios from "axios";
import { returnErrors } from "./messages";

import * as actions from "./actionTypes";

export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: actions.USER_LOADING });
  axios
    .get("/account/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: actions.AUTH_ERROR,
      });
    });
};


//User Login
export const loginUser = (username, password) => (dispatch) => {
     
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    //request body
    const body=JSON.stringify({username,password})
  
    axios
      .post("/account/api/auth/login", body, config)
      .then((res) => {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: actions.LOGIN_FAIL,
        });
      });
  };
  


//User Register
export const registerUser = (user)=> (dispatch) => {
     
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    //request body
    const body=JSON.stringify(user)
  
    axios
      .post("/account/api/auth/register", user, config)
      .then((res) => {
        dispatch({
          type: actions.REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: actions.REGISTER_FAIL,
        });
      });
  };
  

  //Logout user
  export const logoutUser = () => (dispatch, getState) => {
    axios
      .post("/account/api/auth/logout", null,tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: actions.LOGOUT_SUCCESS          
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));

      });
  };


  // Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };