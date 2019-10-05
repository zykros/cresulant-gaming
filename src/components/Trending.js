import React, { Component } from "react";
import axios from "axios";

import GameList from "./GameList";
import Spinner from "./Spinner";

import "../styles/GameList.css";

class Trending extends Component {
  state = {
    gameData: [],
    gamesPerPage: 15,
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
      data: `fields cover.*, slug, name, summary, screenshots.*, videos.*, *; where themes != (42); sort popularity desc; limit 50;`
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
    const { gameData, gamesPerPage, loading } = this.state;

    return (
      <div className="gamesContainerAll">
        <h1 className="homeHeader" style={{ paddingTop: "30px" }}>
          Trending
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <GameList gamesPerPage={gamesPerPage} gameData={gameData} />
        )}
      </div>
    );
  }
}

export default Trending;
