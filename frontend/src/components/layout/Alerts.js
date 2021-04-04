import React, { Component, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withAlert } from "react-alert";

export function Alerts({ alert }) {
  const error = useSelector((state) => state.errors);
  const messages = useSelector((state) => state.messages);
  const [messages_state, setMessages] = useState({});
  const [error_state, setError] = useState({});

  if (messages != messages_state) {
    setMessages(messages);
  }
  if (error != error_state) {
    setError(error);
  }
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (error.status) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.username) alert.error(error.msg.username);
      if (error.msg.price) alert.error(`Price: ${error.msg.price.join()}`);
      if (error.msg.description)
        alert.error(`Description: ${error.msg.description.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      //if (error.msg.detail) if(isAuthenticated!=true) alert.error(`Details: ${error.msg.detail}`);
    }
  }, [error_state]);

  useEffect(() => {
    if (messages.ProductDelete) alert.success(messages.ProductDelete);
    if (messages.ProductAdd) alert.success(messages.ProductAdd);
    if (messages.passwordNotMatch) alert.error(messages.passwordNotMatch);
  }, [messages_state]);

  return <Fragment />;
}

export default withAlert()(Alerts);

/*export class Alerts extends Component {

    componentDidMount()
    {
        this.props.alert.show("It works");
    }
    render() {
        return (
           <Fragment/>
        )
    }
}

export default withAlert()(Alerts);*/
