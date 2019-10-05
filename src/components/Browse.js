import React, { Component } from "react";
import axios from "axios";

import fire from "../firebase/Firebase";

import GameList from "./GameList";
import Spinner from "./Spinner";

import "../styles/Browse.css";

import { Contexts } from "../Provider/Provider";

class Browse extends Component {
  state = {
    genres: [
      {
        id: 13,
        created_at: 1297555200,
        name: "Simulator",
        slug: "simulator",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/simulator"
      },
      {
        id: 24,
        created_at: 1300924800,
        name: "Tactical",
        slug: "tactical",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/tactical"
      },
      {
        id: 26,
        created_at: 1301961600,
        name: "Quiz/Trivia",
        slug: "quiz-trivia",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/quiz-trivia"
      },
      {
        id: 4,
        created_at: 1297555200,
        name: "Fighting",
        slug: "fighting",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/fighting"
      },
      {
        id: 15,
        created_at: 1297555200,
        name: "Strategy",
        slug: "strategy",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/strategy"
      },
      {
        id: 31,
        created_at: 1323561600,
        name: "Adventure",
        slug: "adventure",
        updated_at: 1323561600,
        url: "https://www.igdb.com/genres/adventure"
      },
      {
        id: 12,
        created_at: 1297555200,
        name: "Role-playing (RPG)",
        slug: "role-playing-rpg",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/role-playing-rpg"
      },
      {
        id: 5,
        created_at: 1297555200,
        name: "Shooter",
        slug: "shooter",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/shooter"
      },
      {
        id: 7,
        created_at: 1297555200,
        name: "Music",
        slug: "music",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/music"
      },
      {
        id: 32,
        created_at: 1341360000,
        name: "Indie",
        slug: "indie",
        updated_at: 1341360000,
        url: "https://www.igdb.com/genres/indie"
      },
      {
        id: 16,
        created_at: 1297641600,
        name: "Turn-based strategy (TBS)",
        slug: "turn-based-strategy-tbs",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/turn-based-strategy-tbs"
      },
      {
        id: 30,
        created_at: 1320192000,
        name: "Pinball",
        slug: "pinball",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/pinball"
      },
      {
        id: 9,
        created_at: 1297555200,
        name: "Puzzle",
        slug: "puzzle",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/puzzle"
      },
      {
        id: 11,
        created_at: 1297555200,
        name: "Real Time Strategy (RTS)",
        slug: "real-time-strategy-rts",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/real-time-strategy-rts"
      },
      {
        id: 25,
        created_at: 1301616000,
        name: "Hack and slash/Beat 'em up",
        slug: "hack-and-slash-beat-em-up",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/hack-and-slash-beat-em-up"
      },
      {
        id: 8,
        created_at: 1297555200,
        name: "Platform",
        slug: "platform",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/platform"
      },
      {
        id: 10,
        created_at: 1297555200,
        name: "Racing",
        slug: "racing",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/racing"
      },
      {
        id: 14,
        created_at: 1297555200,
        name: "Sport",
        slug: "sport",
        updated_at: 1323216000,
        url: "https://www.igdb.com/genres/sport"
      },
      {
        id: 33,
        created_at: 1380931200,
        name: "Arcade",
        slug: "arcade",
        updated_at: 1380931200,
        url: "https://www.igdb.com/genres/arcade"
      },
      {
        id: 2,
        created_at: 1297555200,
        name: "Point-and-click",
        slug: "point-and-click",
        updated_at: 1323302400,
        url: "https://www.igdb.com/genres/point-and-click"
      }
    ],
    themes: [
      {
        id: 38,
        created_at: 1345420800,
        name: "Open world",
        slug: "open-world",
        updated_at: 1345420800,
        url: "https://www.igdb.com/themes/open-world"
      },
      {
        id: 19,
        created_at: 1322524800,
        name: "Horror",
        slug: "horror",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/horror"
      },
      {
        id: 39,
        created_at: 1345420800,
        name: "Warfare",
        slug: "warfare",
        updated_at: 1345420800,
        url: "https://www.igdb.com/themes/warfare"
      },
      {
        id: 32,
        created_at: 1323561600,
        name: "Non-fiction",
        slug: "non-fiction",
        updated_at: 1323561600,
        url: "https://www.igdb.com/themes/non-fiction"
      },
      {
        id: 1,
        created_at: 1322524800,
        name: "Action",
        slug: "action",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/action"
      },
      {
        id: 18,
        created_at: 1322524800,
        name: "Science fiction",
        slug: "science-fiction",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/science-fiction"
      },
      {
        id: 23,
        created_at: 1322524800,
        name: "Stealth",
        slug: "stealth",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/stealth"
      },
      {
        id: 41,
        created_at: 1357084800,
        name: "4X (explore, expand, exploit, and exterminate)",
        slug: "4x-explore-expand-exploit-and-exterminate",
        updated_at: 1357084800,
        url:
          "https://www.igdb.com/themes/4x-explore-expand-exploit-and-exterminate"
      },
      {
        id: 31,
        created_at: 1323561600,
        name: "Drama",
        slug: "drama",
        updated_at: 1323561600,
        url: "https://www.igdb.com/themes/drama"
      },
      {
        id: 22,
        created_at: 1322524800,
        name: "Historical",
        slug: "historical",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/historical"
      },
      {
        id: 28,
        created_at: 1322524800,
        name: "Business",
        slug: "business",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/business"
      },
      {
        id: 35,
        created_at: 1326758400,
        name: "Kids",
        slug: "kids",
        updated_at: 1326758400,
        url: "https://www.igdb.com/themes/kids"
      },
      {
        id: 42,
        created_at: 1463702400,
        name: "Erotic",
        slug: "erotic",
        updated_at: 1463702400,
        url: "https://www.igdb.com/themes/erotic"
      },
      {
        id: 33,
        created_at: 1326499200,
        name: "Sandbox",
        slug: "sandbox",
        updated_at: 1326499200,
        url: "https://www.igdb.com/themes/sandbox"
      },
      {
        id: 40,
        created_at: 1356825600,
        name: "Party",
        slug: "party",
        updated_at: 1356825600,
        url: "https://www.igdb.com/themes/party"
      },
      {
        id: 17,
        created_at: 1322524800,
        name: "Fantasy",
        slug: "fantasy",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/fantasy"
      },
      {
        id: 43,
        created_at: 1465171200,
        name: "Mystery",
        slug: "mystery",
        updated_at: 1465171200,
        url: "https://www.igdb.com/themes/mystery"
      },
      {
        id: 20,
        created_at: 1322524800,
        name: "Thriller",
        slug: "thriller",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/thriller"
      },
      {
        id: 21,
        created_at: 1322524800,
        name: "Survival",
        slug: "survival",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/survival"
      },
      {
        id: 34,
        created_at: 1326758400,
        name: "Educational",
        slug: "educational",
        updated_at: 1326758400,
        url: "https://www.igdb.com/themes/educational"
      },
      {
        id: 27,
        created_at: 1322524800,
        name: "Comedy",
        slug: "comedy",
        updated_at: 1323216000,
        url: "https://www.igdb.com/themes/comedy"
      }
    ],
    platforms: [],
    loading: true,
    genresSelected: [],
    themesSelected: [],
    platformsSelected: [],
    filters: ""
  };

  async componentDidMount() {
    let cors = "https://cors-anywhere.herokuapp.com/";
    let genres = "https://api-v3.igdb.com/genres/";
    let themes = "https://api-v3.igdb.com/themes/";
    let platforms = "https://api-v3.igdb.com/platforms/";
    let API_KEY = "07729238bac650a23c87371ebd3f2c9c";
    //   axios({
    //     url: cors + genres,
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "user-key": API_KEY
    //     },
    //     data: `fields *; limit 50;`
    //   })
    //     .then(response => {
    //       this.setState({
    //         genres: response.data,
    //         loading: false
    //       });
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });

    //   axios({
    //     url: cors + themes,
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "user-key": API_KEY
    //     },
    //     data: `fields *; limit 50;`
    //   })
    //     .then(response => {
    //       this.setState({
    //         themes: response.data,
    //         loading: false
    //       });
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    let platformArray = [];
    await axios({
      url: cors + platforms,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": API_KEY
      },
      data: `fields *; limit 50;`
    })
      .then(response => {
        platformArray.push(response.data);
      })
      // .then(() => this.setState({ platforms: platformArray }))
      .catch(err => {
        console.error(err);
      });

    // let loop = 1;

    // for (let i = 0; i < loop; i++) {
    //   let offset = 50;
    //   let temp = [];
    //   axios({
    //     url: cors + platforms,
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "user-key": API_KEY
    //     },
    //     data: `fields *; limit 50; offset ${offset};`
    //   }).then(response => {
    //     temp = response;
    //     if (temp) {
    //       platformArray.concat(temp);
    //       offset = offset + 50;
    //       loop++;
    //     }
    //   });
    // }

    this.setState({ platforms: platformArray });
    console.log(platformArray);
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
            <button onClick={() => console.log(context.state.platform)}>
              test
            </button>
          )}
        </Contexts.Consumer>
      </div>
    );
  }
}

export default Browse;
