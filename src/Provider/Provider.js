import React, { Component } from "react";
import fire from "../firebase/Firebase";

export const Contexts = React.createContext();

class Provider extends Component {
  state = {
    user: null,
    loginModalActive: false,
    updateDate: undefined,
    slugName: "",
    sidebarVisible: false,
    gamesFollowed: null,
    getGamesFollowed: () => {
      const db = fire.firestore();

      const usersRef = db.collection("users").doc(this.state.user.uid);

      usersRef
        .get()
        .then(doc =>
          this.setState({ gamesFollowed: doc.data().gamesFollowed })
        );
    },
    loginModalHandler: () => {
      this.setState({
        loginModalActive: !this.state.loginModalActive,
        sidebarVisible: false
      });
    },
    loginModalCloseContainer: e => {
      if (e.target.className === "modalContainer") {
        this.setState({
          loginModalActive: false
        });
      }
    },
    loginModalClose: () => {
      this.setState({
        loginModalActive: false
      });
    },
    updateUpdateDate: (update, slug) => {
      this.setState({
        slugName: slug,
        updateDate: update
      });
    },
    sidebarToggle: () => {
      this.setState({
        sidebarVisible: !this.state.sidebarVisible,
        loginModalActive: false
      });
    },
    sidebarClickOutside: e => {
      if (e.target.className === "sidebarContainer") {
        this.setState({
          sidebarVisible: false
        });
      }
    }
  };

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    const db = fire.firestore();

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  };

  render() {
    return (
      <Contexts.Provider value={{ state: this.state }}>
        {this.props.children}
      </Contexts.Provider>
    );
  }
}

export default Provider;
