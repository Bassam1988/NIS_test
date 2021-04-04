import React, { useState, Fragment } from "react";
import CustomizedRatings from "./Rating";
import { useDispatch,useSelector } from "react-redux";
import { addFeedback } from "../../redux/actions/productsActions";



function AddFeedback({ product_id,handleFeedbackCange }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  let newDate = new Date()
  let date = newDate.getDate();
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      customer: null,
      product: product_id,
      rating: +rating,
      description,
    };

    const uploadData = new FormData();
    uploadData.append('customer',1);
    uploadData.append('product', product_id);
    uploadData.append('description', description);
    uploadData.append('rating',0+rating);
   

    dispatch(addFeedback(uploadData,handleFeedbackCange));
  };

  return (
    <div>
      <h2>Reviews</h2>
      <div  className="submit-review">
        <div className="rating-chooser">
          <p>Your rating</p>

          <div className="rating-wrap-post">
            <Fragment>
              <CustomizedRatings ratingChanged1={ratingChanged} />
            </Fragment>
          </div>
        </div>
        <p>
          <label htmlFor="review">Your review</label>{" "}
          <textarea
            name="review"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </p>
        <p>
          <input type="submit" onClick={onSubmit} value="Submit"></input>
        </p>
      </div>
    </div>
  );
}

export default AddFeedback;
