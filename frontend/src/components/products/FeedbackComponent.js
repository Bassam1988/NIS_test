import React from "react";
import ReactStars from "react-rating-stars-component";

const Image = {
  flex: 1,
  width: 70,
  height: 60,
  resizeMode: "contain",
};

function FeedbackComponent({ feedbackContent }) {
  return (
    <div className="tm-comment tm-mb-45">
      {feedbackContent.customer.profile ? (
        <figure className="tm-comment-figure">
          <table>
            <tbody>
            <tr>
              <td>
                <img
                  src={feedbackContent.customer.profile.img}
                  alt="Image"
                  style={Image}
                  className="mb-2 rounded-circle img-thumbnail"
                />
              </td>
              <td>
                <figcaption className="tm-color-primary text-center">
                  {feedbackContent.customer.first_name}{" "}
                  {feedbackContent.customer.last_name}
                </figcaption>
              </td>
            </tr>
            </tbody>
          </table>
        </figure>
      ) : (
        ""
      )}

      <ReactStars
        count={5}
        value={feedbackContent.rating}
        //onChange={ratingChanged}
        size={20}
        edit={false}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
      <p>{feedbackContent.description}</p>
      <div className="d-flex justify-content-between">
        <span className="tm-color-primary">{feedbackContent.created_at}</span>
      </div>
      <p>----------------------------------</p>
    </div>
  );
}

export default FeedbackComponent;
