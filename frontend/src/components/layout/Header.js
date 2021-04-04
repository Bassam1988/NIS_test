import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/auth";

function Header() {
  const auth = useSelector((state) => state.auth);
  const [country, setCountry] = useState('Lebanon')

  function getLocation() {
    fetch("https://extreme-ip-lookup.com/json/")
      .then((res) => res.json())
      .then((response) => {
        //console.log("Country: ", response.country);
        setCountry(response.country)
      })
      .catch((data, status) => {
        setCountry("Request failed");
      });
  }

  useEffect(() => {
    getLocation();
  }, [])
  
  const dispatch = useDispatch();
  return (
    <div>
      <div className="header-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="user-menu">
                {auth.isAuthenticated ? (
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-user"></i> My Account
                      </a>
                    </li>

                    <li>
                    <a href="#" onClick={() => dispatch(logoutUser())} ><i  className="fa fa-user"></i> Logout</a>
                    </li>
                  </ul>
                ) : (
                  <ul >
                    <li >
                      <Link to="/register" className="fa fa-user">
                        Register
                      </Link>
                    </li>
                    <li >
                      <Link to="/login" className="fa fa-user">
                        Login
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="header-right">
                <ul className="list-unstyled list-inline">
                  <li className="dropdown dropdown-small">
                   <p>Country: {country}</p>
                  </li>

                  <li className="dropdown dropdown-small">
                  <p>Time: {new Date().toLocaleTimeString()}</p>
                  </li>
                  <li className="dropdown dropdown-small">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-branding-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="logo">
                <h1>
                  <a href="/">
                    WYW-WYD <br></br> <span>BuyWhatYouWantSellWhatYouDo</span>
                  </a>
                </h1>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="shopping-item">
                {auth.isAuthenticated ? ( <span className="navbar-text mr-3">
                      <strong>
                        {auth.user ? `Welcome ${auth.user.first_name}` : ""}
                      </strong>
                    </span>) : ( <span className="navbar-text mr-3">
                      <strong>
                        Welcome to our website, Please register 
                      </strong>
                    </span>)}
             
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mainmenu-area">
        <div className="container">
            <div className="row">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div> 
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="Home">Home</Link></li>
                        <li><a href="shop.html">Shop page</a></li>
                        {auth.user && auth.user.groups[0]!=6 ? (<li><Link to="AddProduct">Add product</Link></li>):("")}
                        
                        <li><a href="cart.html">Cart</a></li>
                        <li><a href="checkout.html">Checkout</a></li>
                        <li><a href="#">Category</a></li>
                        <li><a href="#">Others</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>  
            </div>
        </div>
    </div>

    </div>
  );
}

export default Header;
