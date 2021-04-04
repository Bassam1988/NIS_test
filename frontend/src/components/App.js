import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router, Route } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";

import Alerts from "./layout/Alerts";
import Dashboard from "./products/Dashboard";

import { Provider } from "react-redux";
import store from "../redux/store";

import Main from "./common/Router";


import { loadUser } from "../redux/actions/auth";
import '../../static/frontend/style/css/sidebarst.css'



const alertOptions = {
  timeout: 3000,
  position: "top center",
};

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Header />
            <Alerts />
            <div>
              <Route component={Main} />
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));