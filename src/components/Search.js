import React, { Component } from "react";
import axios from "axios";

import GameList from "./GameList";
import "../styles/GameList.css";

class Search extends Component {
  state = {
    gameData: [],
    searchName: "",
    gamesPerPage: 15
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
      data: `fields slug, cover.*, screenshots.*, name, summary, videos.*; search "${
        this.state.searchName
      }"; limit 50;`
    })
      .then(response => {
        this.setState({
          gameData: response.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillMount() {
    const { name } = this.props.match.params;

    this.setState({
      searchName: name
    });
  }

  render() {
    const { gameData, gamesPerPage } = this.state;
    const { name } = this.props.match.params;
    return (
      <div>
        <br />
        <br />
        <h1>{`Search Results For: ${name}`}</h1>
        <GameList gamesPerPage={gamesPerPage} gameData={gameData} />
      </div>
    );
  }
}

export default Search;
