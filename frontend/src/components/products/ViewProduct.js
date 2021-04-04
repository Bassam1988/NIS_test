import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FeedbackComponent from "./FeedbackComponent";
import ReactStars from "react-rating-stars-component";
import Feedback from "./AddFeedback";
import _ from "lodash";

function ViewProduct(props) {
  const [generalRating, setGeneralRating] = useState(0);

  // const { product } = useParams()
  const { product1 } = props.location.state;
  const [feedbacks, setfeedbacks] = useState(product1.feedbacks);

  const handleFeedbackCange = (newFeedback) => {
    setfeedbacks([...feedbacks, newFeedback]);
  };

  return (
    <div>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>
                  {product1.m_category.name}: {product1.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="single-sidebar">
                <h2 className="sidebar-title">Product's Rating</h2>
                <Fragment>
                  <ReactStars
                    count={5}
                    value={2}
                    //onChange={ratingChanged}
                    size={40}
                    edit={false}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </Fragment>
              </div>

              <div className="single-sidebar">
                <h2 className="sidebar-title">Feadbacks</h2>
                {feedbacks.map((feedback) => (
                  <FeedbackComponent
                    key={feedback.id}
                    feedbackContent={feedback}
                  />
                ))}
              </div>
            </div>

            <div className="col-md-8">
              <div className="product-content-right">
                <div className="product-breadcroumb">
                  <a href="">{product1.m_category.name}</a>
                  <a href="">
                    {product1.s_categories.length
                      ? product1.s_categories[0].name
                      : ""}
                  </a>
                  <a href="">{product1.name}</a>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="product-images">
                      <div className="product-main-img">
                        <img src={product1.img} alt=""></img>
                      </div>

                      <div className="product-gallery">
                        {product1.images.length!=0
                          ? product1.images.map((image) => (
                              <img key={image.id} src={image.img} alt=""></img>
                            ))
                          : "No other images"}
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="product-inner">
                      <h2 className="product-name">{product1.name}</h2>
                      <div className="product-inner-price">
                        <ins>${product1.price}</ins>{" "}
                        <del>${product1.old_price}</del>
                      </div>

                      <form className="cart">
                        <div className="quantity">
                          <input
                            type="number"
                            size="4"
                            className="input-text qty text"
                            title="Qty"
                            defaultValue="1"
                            name="quantity"
                            min="1"
                            step="1"
                          ></input>
                        </div>
                        <button className="add_to_cart_button" type="submit">
                          Add to cart
                        </button>
                      </form>

                      <div className="product-inner-category">
                        <p>
                          Category: <a href="">{product1.m_category.name}</a>.
                          Tags: <a href="">awesome</a>, <a href="">best</a>,{" "}
                          <a href="">sale</a>, <a href="">shoes</a>.{" "}
                        </p>
                      </div>

                      <div role="tabpanel">
                        <ul className="product-tab" role="tablist">
                          <li role="presentation" className="active">
                            <a
                              href="#home"
                              aria-controls="home"
                              role="tab"
                              data-toggle="tab"
                            >
                              Description
                            </a>
                          </li>
                          <li role="presentation">
                            <a
                              href="#profile"
                              aria-controls="profile"
                              role="tab"
                              data-toggle="tab"
                            >
                              Reviews
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane fade in active"
                            id="home"
                          >
                            <h2>Product Description</h2>
                            <p>{product1.description}</p>
                          </div>
                          <div
                            role="tabpanel"
                            className="tab-pane fade"
                            id="profile"
                          >
                            <Feedback
                              product_id={product1.id}
                              handleFeedbackCange={handleFeedbackCange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="related-products-wrapper">
                  <h2 className="related-products-title">Related Products</h2>
                  <div className="related-products-carousel">
                    <div className="single-product">
                      <div className="product-f-image">
                        <img src="img/product-1.jpg" alt=""></img>
                        <div className="product-hover">
                          <a href="" className="add-to-cart-link">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                          </a>
                          <a href="" className="view-details-link">
                            <i className="fa fa-link"></i> See details
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a href="">Sony Smart TV - 2015</a>
                      </h2>

                      <div className="product-carousel-price">
                        <ins>$700.00</ins> <del>$800.00</del>
                      </div>
                    </div>
                    <div className="single-product">
                      <div className="product-f-image">
                        <img src="img/product-2.jpg" alt=""></img>
                        <div className="product-hover">
                          <a href="" className="add-to-cart-link">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                          </a>
                          <a href="" className="view-details-link">
                            <i className="fa fa-link"></i> See details
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a href="">Apple new mac book 2015 March :P</a>
                      </h2>
                      <div className="product-carousel-price">
                        <ins>$899.00</ins> <del>$999.00</del>
                      </div>
                    </div>
                    <div className="single-product">
                      <div className="product-f-image">
                        <img src="img/product-3.jpg" alt=""></img>
                        <div className="product-hover">
                          <a href="" className="add-to-cart-link">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                          </a>
                          <a href="" className="view-details-link">
                            <i className="fa fa-link"></i> See details
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a href="">Apple new i phone 6</a>
                      </h2>

                      <div className="product-carousel-price">
                        <ins>$400.00</ins> <del>$425.00</del>
                      </div>
                    </div>
                    <div className="single-product">
                      <div className="product-f-image">
                        <img src="img/product-4.jpg" alt=""></img>
                        <div className="product-hover">
                          <a href="" className="add-to-cart-link">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                          </a>
                          <a href="" className="view-details-link">
                            <i className="fa fa-link"></i> See details
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a href="">Sony playstation microsoft</a>
                      </h2>

                      <div className="product-carousel-price">
                        <ins>$200.00</ins> <del>$225.00</del>
                      </div>
                    </div>
                    <div className="single-product">
                      <div className="product-f-image">
                        <img src="img/product-5.jpg" alt=""></img>
                        <div className="product-hover">
                          <a href="" className="add-to-cart-link">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                          </a>
                          <a href="" className="view-details-link">
                            <i className="fa fa-link"></i> See details
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a href="">Sony Smart Air Condtion</a>
                      </h2>

                      <div className="product-carousel-price">
                        <ins>$1200.00</ins> <del>$1355.00</del>
                      </div>
                    </div>
                    <div className="single-product">
                      <div className="product-f-image">
                        <img src="img/product-6.jpg" alt=""></img>
                        <div className="product-hover">
                          <a href="" className="add-to-cart-link">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                          </a>
                          <a href="" className="view-details-link">
                            <i className="fa fa-link"></i> See details
                          </a>
                        </div>
                      </div>

                      <h2>
                        <a href="">Samsung gallaxy note 4</a>
                      </h2>

                      <div className="product-carousel-price">
                        <ins>$400.00</ins>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="footer-about-us">
                <h2>
                  e<span>Electronics</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis sunt id doloribus vero quam laborum quas alias
                  dolores blanditiis iusto consequatur, modi aliquid eveniet
                  eligendi iure eaque ipsam iste, pariatur omnis sint! Suscipit,
                  debitis, quisquam. Laborum commodi veritatis magni at?
                </p>
                <div className="footer-social">
                  <a href="#" target="_blank">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fa fa-youtube"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fa fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-menu">
                <h2 className="footer-wid-title">User Navigation </h2>
                <ul>
                  <li>
                    <a href="">My account</a>
                  </li>
                  <li>
                    <a href="">Order history</a>
                  </li>
                  <li>
                    <a href="">Wishlist</a>
                  </li>
                  <li>
                    <a href="">Vendor contact</a>
                  </li>
                  <li>
                    <a href="">Front page</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-menu">
                <h2 className="footer-wid-title">Categories</h2>
                <ul>
                  <li>
                    <a href="">Mobile Phone</a>
                  </li>
                  <li>
                    <a href="">Home accesseries</a>
                  </li>
                  <li>
                    <a href="">LED TV</a>
                  </li>
                  <li>
                    <a href="">Computer</a>
                  </li>
                  <li>
                    <a href="">Gadets</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-newsletter">
                <h2 className="footer-wid-title">Newsletter</h2>
                <p>
                  Sign up to our newsletter and get exclusive deals you wont
                  find anywhere else straight to your inbox!
                </p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Type your email"></input>
                  <input type="submit" defaultValue="Subscribe"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="copyright">
                <p>
                  &copy; 2015 eElectronics. All Rights Reserved. Coded with{" "}
                  <i className="fa fa-heart"></i> by{" "}
                  <a href="http://wpexpand.com" target="_blank">
                    WP Expand
                  </a>
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="footer-card-icon">
                <i className="fa fa-cc-discover"></i>
                <i className="fa fa-cc-mastercard"></i>
                <i className="fa fa-cc-paypal"></i>
                <i className="fa fa-cc-visa"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
