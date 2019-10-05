import React, { Component } from "react";
import Steam from "openid-steam";

import { Link } from "react-router-dom";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button
} from "@material-ui/core";

import { withStyles, withTheme } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import logo from "../../assets/cresulant_logo.png";

import "./styles/ProfileFollowing.css";
import { Contexts } from "../../Provider/Provider";

class ProfileFollowing extends Component {
  getSteam = () => {
    const steam = new Steam("http://localhost:3000");
    steam
      .url()
      .then(url => {
        // Redirect user to this url
        console.log(url);
      })
      .catch(error => {
        console.log(error.message);
      });

    // Then user will be returned to a similar URL as below:
    const url = window.location.href;

    // Which you can verify in order to identify the user
    steam
      .verify(url)
      .then(steamId => {
        console.log(steamId);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const ExpansionPanelC = withStyles({
      root: {
        border: "none"
      }
    })(ExpansionPanel);

    const ExpansionPanelSummaryC = withStyles({
      root: {
        background: "#3c3c3f",
        borderBottom: "1px solid rgba(0,0,0,.125)"
      }
    })(ExpansionPanelSummary);

    ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

    const ExpansionPanelDetailsC = withStyles(theme => ({
      root: {
        padding: theme.spacing.unit * 2,
        background: "rgb(165, 154, 154)"
      }
    }))(ExpansionPanelDetails);

    const { gameData } = this.props;

    const followLabel = "Follow";

    const buttonStyle = {
      display: "flex",
      justifyContent: "flex-end",
      right: "0",
      position: "absolute",
      alignItems: "center"
    };
    return (
      <Contexts.Consumer>
        {context => (
          <div style={{ width: "100%", marginTop: "5px" }}>
            <ExpansionPanelC square>
              <ExpansionPanelSummaryC
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              >
                <Typography style={{ color: "white" }}>
                  Games ({gameData.length})
                </Typography>
              </ExpansionPanelSummaryC>
              <ExpansionPanelDetailsC>
                <div style={{ width: "100%", marginTop: "5px" }}>
                  {gameData.length < 1 ? (
                    <div>No games followed</div>
                  ) : (
                    gameData.map(games => {
                      const cover = games.hasOwnProperty("cover")
                        ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${
                            games.cover.image_id
                          }.jpg`
                        : logo;
                      return (
                        <div className="gamesFollowedContainer" key={games.id}>
                          <div className="gamesFollowedImage">
                            <img alt={gameData.name} src={cover} />
                          </div>
                          <Link
                            to={`/games/${games.slug}`}
                            className="gamesFollowedName"
                          >
                            {games.name}
                          </Link>
                          <Button
                            className="profileGamesFollow"
                            style={buttonStyle}
                          >
                            {context.state.user !== null
                              ? followLabel
                              : undefined}
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>
              </ExpansionPanelDetailsC>
            </ExpansionPanelC>
            <ExpansionPanelC square>
              <ExpansionPanelSummaryC
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
              >
                <Typography style={{ color: "white" }}>People</Typography>
              </ExpansionPanelSummaryC>
              <ExpansionPanelDetailsC>
                <Typography>nothing here yet</Typography>
              </ExpansionPanelDetailsC>
            </ExpansionPanelC>
          </div>
        )}
      </Contexts.Consumer>
    );
  }
}

export default ProfileFollowing;
