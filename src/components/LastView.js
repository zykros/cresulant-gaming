import React, { Component } from "react";
import fire from "../firebase/Firebase";

import GameList from "./GameList";
import Spinner from "./Spinner";

import "../styles/GameList.css";

class LastView extends Component {
  state = {
    gameData: [],
    reviews: [],
    gamesPerPage: 10,
    loading: true
  };

  async componentDidMount() {
    const db = fire.firestore();

    let recentlyViewed = [];

    await db
      .collection("games")
      .where("lastViewed", "<=", Date.now())
      .orderBy("lastViewed", "desc")
      .limit(50)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          recentlyViewed.push(doc.data());
          console.log(doc.data());
        });
      })
      .catch(error => {
        alert("there's an error");
        console.log(error);
      });

    this.setState({
      gameData: recentlyViewed,
      loading: false
    });
  }

  render() {
    const { gameData, gamesPerPage, loading } = this.state;

    return (
      <div>
        <div className="gamesContainerAll">
          <div className="homeHeader" style={{ paddingTop: "30px" }}>
            <h1>Recently Viewed</h1>
            <div className="headerOptions">test</div>
          </div>

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

export default LastView;
