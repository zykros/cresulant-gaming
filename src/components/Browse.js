import React, { Component } from "react";
import axios from "axios";

import fire from "../firebase/Firebase";

import GameList from "./GameList";
import Spinner from "./Spinner";

import "../styles/Browse.css";

import { Contexts } from "../Provider/Provider";

class Browse extends Component {
  state = {
    genres: [],
    themes: [],
    platforms: [],
    loading: true,
    genresSelected: [],
    themesSelected: [],
    platformsSelected: [],
    filters: ""
  };

  componentDidMount() {
    let cors = "https://cors-anywhere.herokuapp.com/";
    let genres = "https://api-v3.igdb.com/genres/";
    let themes = "https://api-v3.igdb.com/themes/";
    let platforms = "https://api-v3.igdb.com/platforms/";
    let API_KEY = "61c0f4f545212cb6c6b15d83f268de6b";
    axios({
      url: cors + genres,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": API_KEY
      },
      data: `fields *; limit 50;`
    })
      .then(response => {
        this.setState({
          genres: response.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
      });

    axios({
      url: cors + themes,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": API_KEY
      },
      data: `fields *; limit 50;`
    })
      .then(response => {
        this.setState({
          themes: response.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
      });

    axios({
      url: cors + platforms,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": API_KEY
      },
      data: `fields *; limit 50;`
    })
      .then(response => {
        this.setState({
          platforms: response.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  applyFilterHandler = () => {
    const { genresSelected, themesSelected, platformsSelected } = this.state;
    var totalSelected = [];
    let result = "";

    if (genresSelected.length > 0) {
      totalSelected.push(`genres=[${genresSelected}]`);
    }
    if (themesSelected.length > 0) {
      totalSelected.push(`themes=[${themesSelected}]`);
    }
    if (platformsSelected.length > 0) {
      totalSelected.push(`platforms=[${platformsSelected}]`);
    }

    if (totalSelected.length < 1) {
      alert("You idiot, choose something.");
    } else if (totalSelected.length > 1) {
      result = totalSelected.reduce((prev, next) => {
        return prev + `&${next}`;
      });
    } else {
      result = totalSelected;
    }

    console.log(totalSelected);
    console.log(result);

    this.props.history.push(`/browse/${result}`);
  };

  render() {
    const {
      genres,
      themes,
      genresSelected,
      themesSelected,
      platformsSelected,
      filters
    } = this.state;

    const totalGenres = `genres = (${genresSelected})`;

    const totalThemes = `themes = (${themesSelected})`;
    return (
      <div>
        <h1 className="homeHeader" style={{ paddingTop: "30px" }}>
          filter test
        </h1>
        <div className="filterSelectionContainer">
          <h1>Genres</h1>
          {this.state.genres.map(x => (
            <button
              style={
                genresSelected.findIndex(genres => genres === x.id) > -1
                  ? { color: "red", borderColor: "red" }
                  : { color: "white" }
              }
              onClick={() => {
                if (genresSelected.findIndex(genres => genres === x.id) > -1) {
                  const genressId = genresSelected.indexOf(x.id);
                  let genresSelectedCopy = [...genresSelected];
                  genresSelectedCopy.splice(genressId, 1);
                  this.setState({
                    genresSelected: genresSelectedCopy
                  });
                } else {
                  return this.setState({
                    genresSelected: genresSelected.concat(x.id)
                  });
                }
              }}
              className="filterSelection"
            >
              {x.name}
            </button>
          ))}
        </div>
        <div className="filterSelectionContainer">
          <h1>Themes</h1>
          {this.state.themes.map(x => (
            <button
              style={
                themesSelected.findIndex(themes => themes === x.id) > -1
                  ? { color: "red" }
                  : { color: "white" }
              }
              onClick={() => {
                if (themesSelected.findIndex(themes => themes === x.id) > -1) {
                  const themesId = themesSelected.indexOf(x.id);
                  let themesSelectedCopy = [...themesSelected];
                  themesSelectedCopy.splice(themesId, 1);
                  this.setState({
                    themesSelected: themesSelectedCopy
                  });
                } else {
                  return this.setState({
                    themesSelected: themesSelected.concat(x.id)
                  });
                }
              }}
              className="filterSelection"
            >
              {x.name}
            </button>
          ))}
        </div>
        <div className="filterSelectionContainer">
          <h1>Platforms</h1>
          {this.state.platforms.map(x => (
            <button
              style={
                platformsSelected.findIndex(platform => platform === x.id) > -1
                  ? { color: "red" }
                  : { color: "white" }
              }
              onClick={() => {
                if (
                  platformsSelected.findIndex(platform => platform === x.id) >
                  -1
                ) {
                  const platformsId = platformsSelected.indexOf(x.id);
                  let platformsSelectedCopy = [...platformsSelected];
                  platformsSelectedCopy.splice(platformsId, 1);
                  this.setState({
                    platformsSelected: platformsSelectedCopy
                  });
                } else {
                  return this.setState({
                    platformsSelected: platformsSelected.concat(x.id)
                  });
                }
              }}
              className="filterSelection"
            >
              {x.name}
            </button>
          ))}
        </div>
        <button onClick={this.applyFilterHandler}>Apply</button>
        <Contexts.Consumer>
          {context => (
            <button onClick={() => console.log(context.state.user)}>
              test
            </button>
          )}
        </Contexts.Consumer>
      </div>
    );
  }
}

export default Browse;
