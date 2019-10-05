import React, { Component } from "react";
import { Contexts } from "../Provider/Provider";
import {
  FaTimes,
  FaHome,
  FaSlidersH,
  FaFire,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/MainMenu.css";
import fire from "../firebase/Firebase";
import logo from "../assets/cresulant_logo.png";

const Sidebar = () => {
  const logout = e => {
    fire.auth().signOut();
    window.location.reload();
  };

  return (
    <Contexts.Consumer>
      {context => (
        <div
          style={
            context.state.sidebarVisible
              ? { visibility: "visible", background: "rgba(0, 0, 0, 0.7)" }
              : { visibility: "hidden" }
          }
          className="sidebarContainer"
          onClick={context.state.sidebarClickOutside}
        >
          <div
            style={
              context.state.sidebarVisible ? { width: "100%" } : { width: "0" }
            }
            className="sidebar"
          >
            <h1 className="section">Cresulant</h1>
            <Link
              className="sidebarItems"
              onClick={context.state.sidebarToggle}
              to="/"
            >
              <span>
                <FaHome />
              </span>
              <span> Home</span>
            </Link>
            <Link
              className="sidebarItems"
              onClick={context.state.sidebarToggle}
              to="/trending"
            >
              <span>
                <FaFire />
              </span>
              <span> Trending</span>
            </Link>
            <Link
              className="sidebarItems"
              onClick={context.state.sidebarToggle}
              to="/browse"
            >
              <span>
                <FaSlidersH />
              </span>
              <span> Browse</span>
            </Link>
            <div className="section">Account</div>
            {context.state.user === null ? (
              <div style={{ height: "100%" }}>
                <Link
                  onClick={context.state.sidebarToggle}
                  className="sidebarItems"
                  to="/signup"
                >
                  <FaUserPlus />
                  <div>Signup</div>
                </Link>
                <div
                  onClick={context.state.loginModalHandler}
                  className="sidebarItems"
                >
                  <FaSignInAlt />
                  <div>Login</div>
                </div>
              </div>
            ) : (
              <div style={{ height: "100%" }}>
                <div onClick={logout} className="sidebarItems">
                  <FaSignOutAlt /> Logout
                </div>
              </div>
            )}
            <FaTimes
              onClick={context.state.sidebarToggle}
              className="sidebarClose"
            />
          </div>
        </div>
      )}
    </Contexts.Consumer>
  );
};

export default Sidebar;
