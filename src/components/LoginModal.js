import React, { Component } from "react";
import fire from "../firebase/Firebase";
import { Link } from "react-router-dom";
import { Contexts } from "../Provider/Provider";

import { FaSignInAlt, FaTimes } from "react-icons/fa";

import "../styles/MainMenu.css";

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    modalActive: false,
    loginError: undefined,
    signupError: undefined
  };

  modalCloseHandler = e => {
    if (e.target.className === "modalContainer") {
      this.setState({
        modalActive: false
      });
    }
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  modalHandler = () => {
    this.setState({
      modalActive: !this.state.modalActive
    });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.login();
      // window.location.reload();
    }
  };

  login = e => {
    this.setState({
      signupError: undefined
    });

    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => window.location.reload())
      .catch(error => {
        this.setState({
          loginError: error
        });
      });
  };

  render() {
    const { loginError } = this.state;
    return (
      <Contexts.Consumer>
        {context => (
          <div>
            <div className="login">
              <button onClick={context.state.loginModalHandler}>
                <FaSignInAlt /> Login
              </button>
            </div>
            <div
              style={
                context.state.loginModalActive
                  ? { visibility: "visible", opacity: "1" }
                  : { visibility: "hidden", opacity: "0" }
              }
              className="modalContainer"
              onClick={context.state.loginModalCloseContainer}
            >
              <div
                style={
                  context.state.loginModalActive
                    ? { transform: "scale(1)" }
                    : { transform: "scale(0)" }
                }
                className="loginModal"
                onKeyPress={this._handleKeyPress}
              >
                <div className="loginField">
                  <input
                    className="inputFields"
                    onChange={this.changeHandler}
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  <input
                    className="inputFields"
                    onChange={this.changeHandler}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <FaTimes
                  className="loginClose close"
                  onClick={context.state.loginModalClose}
                />
                <span>
                  <Link to="/signup/">
                    <button
                      id="loginClose"
                      onClick={context.state.loginModalClose}
                    >
                      Sign Up
                    </button>
                  </Link>
                  <button onClick={this.login}>Login</button>
                </span>
                <p>
                  {loginError !== undefined &&
                    "Wrong email or password, please try again"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Contexts.Consumer>
    );
  }
}

export default LoginModal;
