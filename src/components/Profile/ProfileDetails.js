import React, { Component } from "react";

import "./styles/ProfileDetails.css";

class ProfileDetails extends Component {
  render() {
    const { profileUser } = this.props;
    return (
      <div className="detailsContainer">
        <div className="detailsFollowing">following</div>
        <div className="detailsProfileDetails">Following</div>
        <div className="detailsGamesFollowing">testing</div>
      </div>
    );
  }
}

export default ProfileDetails;
