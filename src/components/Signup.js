import React, { Component } from "react";

import fire from "../firebase/Firebase";

import { Contexts } from "../Provider/Provider";

import "../styles/Signup.css";

class Signup extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    signupError: "",
    loggedIn: false,
    displayNameCheck: null
  };

  signup = async e => {
    const db = fire.firestore();

    this.setState({
      loginError: undefined
    });

    e.preventDefault();

    await db
      .collection("users")
      .where("displayName", "==", this.state.displayName.toLowerCase())
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => {
          this.setState({
            displayNameCheck: doc.data().displayName
          });
        })
      )
      .then(() => console.log(this.state.displayNameCheck))
      .catch(error => console.log(error));

    if (this.state.displayNameCheck !== null) {
      await this.setState({
        signupError: "Display Name already taken, please try another one.",
        displayNameCheck: null
      });
    } else {
      await fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          const user = fire.auth().currentUser;
          user.updateProfile({
            displayName: this.state.displayName.toLowerCase
          });
        })
        .then(() => {
          const user = fire.auth().currentUser;
          const db = fire.firestore();
          const usersRef = db.collection("users").doc(`${user.uid}`);
          usersRef.set({
            uid: user.uid,
            displayName: this.state.displayName.toLowerCase(),
            authLevel: 0,
            userLevel: 0,
            email: this.state.email
          });
        })
        .then(u => {
          this.props.history.push(`/`);
        })
        .catch(error => {
          this.setState({
            signupError: error.message
          });
          console.log(error);
        });
    }
  };

  // componentWillMount() {
  //   fire.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({
  //         loggedIn: true
  //       });
  //       console.log(user.uid);
  //     }
  //   });
  // }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Contexts.Consumer>
        {context => (
          <div className="signupContainer">
            {context.state.user != null ? (
              <div>
                You are already logged in. Please log out if you want to sign
                up.
              </div>
            ) : (
              <form onSubmit={this.signup} className="formContainer">
                <input
                  onChange={this.changeHandler}
                  className="signupInputFields"
                  type="text"
                  name="displayName"
                  placeholder="Display Name"
                  value={this.state.displayName}
                />
                <input
                  onChange={this.changeHandler}
                  className="signupInputFields"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                />
                <input
                  onChange={this.changeHandler}
                  className="signupInputFields"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                />
                <button type="submit">Register</button>
                <div style={{ color: "red" }}>{this.state.signupError}</div>
              </form>
            )}
          </div>
        )}
      </Contexts.Consumer>
    );
  }
}

export default Signup;
