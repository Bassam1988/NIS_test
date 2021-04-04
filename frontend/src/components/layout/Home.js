import React, { Component, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import * as _ from "lodash";

import {
  getProducts,
  delProduct,
  getSubCategories,
  getMCategories,
} from "../../redux/actions/productsActions";

function Home() {
  const products1 = useSelector((state) => state.products.products);
  const top_viewed = _.sortBy(products1, "numberOfViews").reverse();
  const recently_viewed = _.sortBy(products1, "viewd_at").reverse();
  const top_new = _.sortBy(products1, "created_at").reverse();
  const main_categories = useSelector((state) => state.products.mCategories);
  //let products = products1;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSubCategories());
    dispatch(getMCategories());
  }, []);

  useEffect(() => {
    setProducts(products1);
  }, [products1]);

  const [products, setProducts] = useState(products1);
  let loopIndex = 3;

  function changeProductListbyCat(cat_type, cat_id) {
    if (cat_type == "m") {
      let products2 = products1.filter(
        (product) => product.m_category.id == cat_id
      );
      setProducts(products2);
    }
    if (cat_type == "s") {
      let products3 = products1.filter((product) =>
        product.s_categories.length > 0
          ? product.s_categories[0].id == cat_id
          : null
      );
      setProducts(products3);
    }
  }

  return (
    <div>
      <div className="sidebar_s">
        <h2>Categories</h2>

        <ProSidebar>
          <Menu iconShape="square">
            {main_categories
              ? main_categories.map((m_cat) =>
                  m_cat.s_cat.length > 0 ? (
                    <SubMenu title={m_cat.name} key={m_cat.id}>
                      <MenuItem
                        onClickCapture={() =>
                          changeProductListbyCat("m", m_cat.id)
                        }
                        key={"all" + m_cat.name}
                      >
                        All {m_cat.name}
                      </MenuItem>
                      {m_cat.s_cat.map((ss_cat) => (
                        <MenuItem
                          onClickCapture={() =>
                            changeProductListbyCat("s", ss_cat.id)
                          }
                          key={ss_cat.name}
                        >
                          {ss_cat.name}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      key={m_cat.id}
                      onClickCapture={() =>
                        changeProductListbyCat("m", m_cat.id)
                      }
                    >
                      {m_cat.name}
                    </MenuItem>
                  )
                )
              : []}
          </Menu>
        </ProSidebar>
      </div>
      <div className="single-product-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="latest-product">
                <h2 className="section-title">Latest Products</h2>
                <div className="row">
                  {products ? (
                    products.map((product) => (
                      <div className="col-md-3 col-sm-6" key={product.id}>
                        <div className="single-product">
                          <div
                            className="product-f-image"
                            width="100"
                            height="200"
                          >
                            <img src={product.img} alt=""></img>
                            <div className="product-hover">
                              {user.groups != [6] ? (
                                <a
                                  href=""
                                  onClick={() =>
                                    dispatch(delProduct(product.id))
                                  }
                                  className="add-to-cart-link"
                                >
                                  <i className="fa fa-shopping-cart"></i> Delete
                                </a>
                              ) : (
                                ""
                              )}

                              <Link
                                to={{
                                  pathname: "/viewProduct/",
                                  state: { product1: product },
                                }}
                                className="view-details-link"
                              >
                                <i className="fa fa-link"></i> See details
                              </Link>
                            </div>
                            <div>{product.summary}</div>
                          </div>

                          <h2>
                            <Link
                              to={{
                                pathname: "/viewProduct/",
                                state: { product1: product },
                              }}
                            >
                              {product.name}
                            </Link>
                          </h2>

                          <div className="product-carousel-price">
                            <ins>{product.price}</ins>{" "}
                            {product.old_price != 0.0 ? (
                              <del>{product.old_price}</del>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <b>No Products</b>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-widget-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="single-product-widget">
                <h2 className="product-wid-title">Top Viewed</h2>
                <a href="" className="wid-view-more">
                  View All
                </a>

                {top_viewed ? (
                  top_viewed.slice(0, loopIndex).map((product) => (
                    <div className="single-wid-product" key={product.id}>
                      <Link
                        to={{
                          pathname: "/viewProduct/",
                          state: { product1: product },
                        }}
                      >
                        <img
                          src={product.img}
                          alt=""
                          className="product-thumb"
                        ></img>
                      </Link>
                      <h2>
                        <Link
                          to={{
                            pathname: "/viewProduct/",
                            state: { product1: product },
                          }}
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <div className="product-wid-rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="product-wid-price">
                        <ins>{product.price}</ins>{" "}
                        {product.old_price != 0.0 ? (
                          <del>{product.old_price}</del>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <b>No Products</b>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-product-widget">
                <h2 className="product-wid-title">Recently Viewed</h2>
                <a href="#" className="wid-view-more">
                  View All
                </a>
                {recently_viewed ? (
                  recently_viewed.slice(0, loopIndex).map((product) => (
                    <div className="single-wid-product" key={product.id}>
                      <Link
                        to={{
                          pathname: "/viewProduct/",
                          state: { product1: product },
                        }}
                      >
                        <img
                          src={product.img}
                          alt=""
                          className="product-thumb"
                        ></img>
                      </Link>
                      <h2>
                        <Link
                          to={{
                            pathname: "/viewProduct/",
                            state: { product1: product },
                          }}
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <div className="product-wid-rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="product-wid-price">
                        <ins>{product.price}</ins>{" "}
                        {product.old_price != 0.0 ? (
                          <del>{product.old_price}</del>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <b>No Products</b>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-product-widget">
                <h2 className="product-wid-title">Top New</h2>
                <a href="#" className="wid-view-more">
                  View All
                </a>

                {top_new ? (
                  top_new.slice(0, loopIndex).map((product) => (
                    <div className="single-wid-product" key={product.id}>
                      <Link
                        to={{
                          pathname: "/viewProduct/",
                          state: { product1: product },
                        }}
                      >
                        <img
                          src={product.img}
                          alt=""
                          className="product-thumb"
                        ></img>
                      </Link>
                      <h2>
                        <Link
                          to={{
                            pathname: "/viewProduct/",
                            state: { product1: product },
                          }}
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <div className="product-wid-rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="product-wid-price">
                        <ins>{product.price}</ins>{" "}
                        {product.old_price != 0.0 ? (
                          <del>{product.old_price}</del>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <b>No Products</b>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
