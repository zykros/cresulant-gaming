import React, { Component } from "react";
import fire from "../firebase/Firebase";
import * as firebase from "firebase/firestore";
import { Contexts } from "../Provider/Provider";

import { FaEnvelope, FaUserPlus } from "react-icons/fa";

import { FaUserCircle } from "react-icons/fa";

import "../styles/Profile.css";
import ProfileDetails from "./Profile/ProfileDetails";
import Spinner from "./Spinner";
import ProfileFollowing from "./Profile/ProfileFollowing";
import { Button } from "@material-ui/core";

class Profile extends Component {
  state = {
    profileUser: null,
    profileName: "",
    currentTab: "Details",
    gameData: [],
    loading: true,
    userFollowed: false,
    buttonOptionsHovered: null
  };

  componentWillMount() {
    const { user } = this.props.match.params;
    this.setState({
      profileName: user
    });
  }

  async componentDidMount() {
    const db = fire.firestore();
    const usersRef = db.collection("users");
    const gamesRef = db.collection("games");

    let data = [];

    await usersRef
      .where("displayName", "==", this.state.profileName.toLowerCase())
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => {
          this.setState({
            profileUser: doc.data()
          });
        })
      )
      .then(() =>
        this.state.profileUser.gamesFollowed.forEach(game =>
          gamesRef
            .where("slug", "==", game)
            .get()
            .then(snapshot => snapshot.forEach(doc => data.push(doc.data())))
        )
      )
      .then(() => this.setState({ gameData: data, loading: false }));
  }

  render() {
    const {
      profileUser,
      profileName,
      currentTab,
      gameData,
      loading
    } = this.state;
    const userUpper =
      profileName.charAt(0).toUpperCase() + profileName.slice(1);

    const buttonStyleOptions = {
      color: "#c9d4e2"
    };

    const buttonFollowStyle = {
      color: "#c9d4e2",
      width: "100px",
      transition: "all 300ms",
      boxShadow: `2px 2px 23px 1px ${
        this.state.userFollowed
          ? "rgba(79, 134, 100, 0.7)"
          : "rgba(79, 103, 134, 0.7)"
      }`
    };

    const profileOptions = [
      { name: "Message", action: "", icon: <FaEnvelope /> },
      { name: "Add", action: "", icon: <FaUserPlus /> }
    ];

    const profileTabs = [
      {
        name: "Details",
        content: (
          <ProfileDetails gameData={gameData} profileUser={profileUser} />
        )
      },
      {
        name: "Following",
        content: (
          <ProfileFollowing
            contextprops={this.props.contextprops}
            gameData={gameData}
          />
        )
      },
      { name: "Test", content: <div>tesst</div> }
    ];
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <Contexts.Consumer>
          {context => {
            return (
              <div className="profileLayout">
                <div className="profileInfo">
                  <div className="profilePic">
                    <FaUserCircle className="profileUserCircle" />
                    <div id="followButton">
                      <Button
                        onClick={() =>
                          this.setState({
                            userFollowed: !this.state.userFollowed
                          })
                        }
                        style={buttonFollowStyle}
                      >
                        {this.state.userFollowed ? "Followed" : "Follow"}
                      </Button>
                    </div>
                  </div>
                  <div className="profileTitle">{userUpper}</div>
                  <div className="profileOptions">
                    {profileOptions.map(options => (
                      <Button
                        onMouseEnter={() =>
                          this.setState({ buttonOptionsHovered: options.name })
                        }
                        onMouseLeave={() =>
                          this.setState({ buttonOptionsHovered: null })
                        }
                        style={buttonStyleOptions}
                      >
                        {options.icon}
                        <div
                          style={
                            this.state.buttonOptionsHovered === options.name
                              ? {
                                  visibility: "visible",
                                  width: "100%",
                                  marginLeft: "10px",
                                  opacity: "1"
                                }
                              : undefined
                          }
                          className="profileOptionsLabel"
                        >
                          {options.name}
                        </div>
                      </Button>
                    ))}
                    {/* <Button
                      onMouseEnter={() =>
                        this.setState({ buttonOptionsHovered: "message" })
                      }
                      onMouseLeave={() =>
                        this.setState({ buttonOptionsHovered: null })
                      }
                      style={buttonStyleOptions}
                    >
                      <FaEnvelope id="messageIcon" />{" "}
                      <div
                        style={
                          this.state.buttonOptionsHovered === "message"
                            ? {
                                visibility: "visible",
                                width: "100%",
                                marginLeft: "10px",
                                opacity: "1"
                              }
                            : undefined
                        }
                        className="profileOptionsLabel"
                      >
                        Message
                      </div>
                    </Button>
                    <Button
                      onMouseEnter={() =>
                        this.setState({ buttonOptionsHovered: "add" })
                      }
                      onMouseLeave={() =>
                        this.setState({ buttonOptionsHovered: null })
                      }
                      style={buttonStyleOptions}
                    >
                      <FaUserPlus id="messageIcon" />{" "}
                      <div
                        style={
                          this.state.buttonOptionsHovered === "add"
                            ? {
                                visibility: "visible",
                                width: "100%",
                                paddingLeft: "10px",
                                opacity: "1"
                              }
                            : undefined
                        }
                        className="profileOptionsLabel"
                      >
                        Add
                      </div>
                    </Button> */}
                  </div>
                  <div className="profileTabs">
                    {profileTabs.map(tabs => (
                      <button
                        className="proTabs"
                        style={
                          currentTab === tabs.name
                            ? {
                                border: "1px solid rgb(79, 103, 134)",
                                borderRadius: "15%"
                              }
                            : undefined
                        }
                        key={tabs.name}
                        onClick={() => this.setState({ currentTab: tabs.name })}
                      >
                        {tabs.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div class="profileContent">
                  {profileTabs.map(
                    tabs => tabs.name === currentTab && tabs.content
                  )}
                </div>
              </div>
            );
          }}
        </Contexts.Consumer>
      );
    }
  }
}

export default Profile;
