import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import * as actions from "./actionTypes";

// Get Products
export const getProducts = () => (dispatch, getState) => {
  axios
    .get("/shop/showProduct/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSubCategories = () => (dispatch, getState) => {
  axios
    .get("/shop/sub_category/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.GET_SUBCAT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getMCategories = () => (dispatch, getState) => {
  axios
    .get("/shop/main_category/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: actions.GET_MCAT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Product
export const delProduct = (id) => (dispatch, getState) => {
  axios
    .delete(`/shop/product/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(
        createMessage({ ProductDelete: "Product Deleted Successfully" })
      );
      dispatch({
        type: actions.DEL_PRODUCT,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Add Product
export const addProduct = (product) => (dispatch, getState) => {
  axios
    .post("/shop/product/", product, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ ProductAdd: "Product Added Successfully" }));
      dispatch({
        type: actions.ADD_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addFeedback = (feedback,handleFeedbackCange) => (dispatch, getState) => {
  //const body=JSON.stringify(user)
  axios
    .post("/shop/feedback/", feedback, tokenConfig(getState))
    .then((res) => {
      handleFeedbackCange(res.data)
      dispatch(createMessage({ feedbackAdd: "Feedback Added Successfully" }));
      dispatch({
        type: actions.ADD_FEEDBACK,
        payload: { feedback: res.data, },
        
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
