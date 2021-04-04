import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "../layout/Home";
import Login from "../accounts/Login";
import Register from "../accounts/Register";
import NotFound from "../NotFound/NotFound"; // User is LoggedIn
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";
import Dashboard from "../products/Dashboard";
import ViewProduct from "../products/ViewProduct";
import AddProductForm from "../products/AddProductForm";

const Main = (props1) => (
  <Switch>
    {/*User might LogIn*/}
    {/*<Route exact path='/' component={Home} />*/}
    {/*User will LogIn*/}
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    {/* User is LoggedIn*/}
    <PrivateRoute path="/Home" component={Home} />
    <PrivateRoute path="/ViewProduct" component={ViewProduct} />
    <SellerRoute path="/AddProduct" component={AddProductForm} />
    {/*Page Not Found*/}
    <Route component={NotFound} />
  </Switch>
);

export default Main;
