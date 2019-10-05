import React, { Component } from "react";
import axios from "axios";

import GameList from "./GameList";
import "../styles/GameList.css";
import Spinner from "./Spinner";

class Latest extends Component {
  state = {
    gameData: [],
    gamesPerPage: 10,
    loading: true
  };

  componentDidMount() {
    let cors = "https://cors-anywhere.herokuapp.com/";
    let url = "https://api-v3.igdb.com/games/";
    let API_KEY = "61c0f4f545212cb6c6b15d83f268de6b";
    axios({
      url: cors + url,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": API_KEY
      },
      data: `fields slug, cover.*, name, summary, first_release_date, *; where first_release_date < ${Math.floor(
        Date.now() / 1000
      )}; sort first_release_date desc; limit 50;`
    })
      .then(response => {
        this.setState({
          gameData: response.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { loading, gameData, gamesPerPage } = this.state;
    return (
      <div>
        <div className="gamesContainerAll">
          <h1 className="homeHeader" style={{ paddingTop: "30px" }}>
            Recently Released Games
          </h1>
          {loading ? (
            <Spinner />
          ) : (
            <GameList gamesPerPage={gamesPerPage} gameData={gameData} />
          )}
        </div>
      </div>
    );
  }
}

export default Latest;
