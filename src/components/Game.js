import React, { Component, useContext } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Videos from "./Videos";
import Reviews from "./Reviews";

import { FaStar } from "react-icons/fa";

import { Contexts } from "../Provider/Provider";

import fire from "../firebase/Firebase";

import "../styles/Game.css";
import Spinner from "./Spinner";
import SimilarGames from "./SimilarGames";

class Game extends Component {
  state = {
    currentUser: [],
    gameData: [],
    gameSlug: "",
    loading: true,
    currentPage: 0,
    currentTab: "Details",
    reviews: []
  };

  componentWillMount() {
    const { slug } = this.props.match.params;

    this.setState({
      gameSlug: slug
    });

    // fire.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.setState({
    //       currentUser: user
    //     });
    //   }
    // });
  }

  componentDidMount() {
    const db = fire.firestore();

    const usersRef = db.collection("games").doc(this.state.gameSlug);

    usersRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        this.firestoreGetData();
      } else {
        this.axiosFetchData();
      }
    });
  }

  axiosFetchData = () => {
    const db = fire.firestore();
    const usersRef = db.collection("games").doc(this.state.gameSlug);

    const cors = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api-v3.igdb.com/games/";
    const API_KEY = "61c0f4f545212cb6c6b15d83f268de6b";
    axios({
      url: cors + url,
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-key": API_KEY
      },
      data: `fields slug, platforms.*, rating, cover.*, name, release_dates.*, url, videos.*, websites.*, alternative_names.*, aggregated_rating_count, total_rating, age_ratings.*, artworks.*, dlcs.*, expansions.*, game_modes.*, genres.*, multiplayer_modes.*, popularity, screenshots.*, status, storyline, summary, themes.*, time_to_beat, similar_games.cover.*, similar_games.name, similar_games.platforms.*, similar_games.slug, similar_games.rating, *; where slug = "${
        this.state.gameSlug
      }";`
    })
      .then(response => {
        usersRef.set(response.data[0]);
      })
      .catch(err => {
        console.error(err);
        alert("Welp, you've done it. You broke the system.");
      })
      .then(() => {
        this.firestoreGetData();
      });
  };

  firestoreGetData = async () => {
    const db = fire.firestore();
    const usersRef = db.collection("games").doc(this.state.gameSlug);

    await db
      .collection("games")
      .where("slug", "==", this.state.gameSlug)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            gameData: doc.data(),
            loading: false,
            currentUser: this.props.contextprops.user
          });
        });
      })
      .then(() => this.checkUpdates())
      .catch(error => {
        console.log(error);
      });

    await usersRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        usersRef.set({ lastViewed: Date.now() }, { merge: true });
      }
    });

    let reviewsArray = [];

    await db
      .collection("reviews")
      .where("slug", "==", this.state.gameSlug)
      .get()
      .then(snapshot => {
        snapshot.forEach(review => {
          reviewsArray.push(review.data());
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      reviews: reviewsArray
    });
  };

  checkUpdates = () => {
    const updateDate = this.props.contextprops.updateDate;

    if (updateDate != undefined) {
      if (updateDate > this.state.gameData.updated_at) {
        this.axiosFetchData();
      }
    }
  };

  tabsLoadHandler = e => {
    this.setState({
      currentTab: e.target.id
    });
  };

  render() {
    const { gameData, loading, currentTab, currentUser, reviews } = this.state;

    const games = gameData;

    const tabButtons = ["Details", "Videos", "Reviews", "Similar Games"];

    if (loading) {
      return <Spinner />;
    } else {
      const backgroundUrl = games.hasOwnProperty("screenshots")
        ? {
            backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_1080p/${
              games.screenshots[0].image_id
            }.jpg)`
          }
        : { background: "grey" };

      const cover = games.hasOwnProperty("cover")
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
            games.cover.image_id
          }.jpg`
        : undefined;

      return (
        <Contexts.Consumer>
          {context => (
            <div>
              <div className="screenshotBackground" style={backgroundUrl}>
                <div className="backgroundFilter" />
              </div>
              <div className="gameContainer" />
              <div className="content">
                <div className="gameTitle" style={{ paddingTop: "10px" }}>
                  <h1>{games.name}</h1>
                </div>
                <div className="genresContainer">
                  {games.genres.map(genres => (
                    <Link
                      to={`/browse/genres = ${genres.id}`}
                      className="genres"
                    >
                      {genres.name}
                    </Link>
                  ))}
                </div>
                <div className="platformNames">
                  Available on:
                  {games.hasOwnProperty("platforms")
                    ? games.platforms.map(platforms => (
                        <div className="platforms">{platforms.name}</div>
                      ))
                    : undefined}
                </div>
                <div className="gameCard">
                  <img src={cover} className="gameCardCover" />
                  <div className="gameInfo">
                    {/* {row 1} */}
                    <div>Rating (IGDB): </div>
                    <div style={{ textAlign: "right" }}>
                      <FaStar style={{ color: "gold" }} />
                      {isNaN(Number(games.rating) / 20)
                        ? "Unrated"
                        : Number(games.rating).toFixed(2) + "/10"}
                    </div>
                    {/* {row 2} */}
                    <div>Release Date: </div>
                    <div style={{ textAlign: "right" }}>
                      {games.hasOwnProperty("release_dates")
                        ? games.release_dates[0].human
                        : undefined}
                    </div>
                    {/* {row 3 MODES} */}

                    {games.hasOwnProperty("game_modes") ? (
                      <React.Fragment>
                        <div>Game Modes: </div>
                        <div style={{ textAlign: "right", height: "100%" }}>
                          {games.game_modes.map(modes => (
                            <div>{modes.name}</div>
                          ))}
                        </div>
                      </React.Fragment>
                    ) : (
                      undefined
                    )}
                    {/* {row 4 test} */}
                    {/* <div>test: </div>
                <div style={{ textAlign: "right" }}>test</div> */}
                  </div>
                </div>
                <div className="gameContent">
                  <div className="tabs">
                    {tabButtons.map(tabs => (
                      <button
                        style={
                          tabs === currentTab
                            ? {
                                borderColor: "white",
                                borderBottom: "none",
                                color: "white"
                              }
                            : undefined
                        }
                        className="tabButtons"
                        onClick={this.tabsLoadHandler}
                        id={tabs}
                      >
                        {tabs}
                      </button>
                    ))}
                  </div>
                  {currentTab === "Details" ? (
                    <div>{games.summary}</div>
                  ) : currentTab === "Reviews" ? (
                    <Reviews
                      reviews={reviews}
                      currentUser={currentUser}
                      gameData={gameData}
                      firestoreGetData={this.firestoreGetData}
                    />
                  ) : currentTab === "Videos" ? (
                    <Videos games={games} />
                  ) : currentTab === "Similar Games" ? (
                    <SimilarGames gameData={gameData} />
                  ) : (
                    undefined
                  )}
                </div>
              </div>
              {console.log(this.state.currentUser)}
            </div>
          )}
        </Contexts.Consumer>
      );
    }
  }
}
export default Game;
