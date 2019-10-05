import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/GameList.css";
import { Contexts } from "../Provider/Provider";

import GameItemModal from "./GameItemModal";

class GameList extends Component {
  state = {
    loading: true,
    hover: null,
    currentPage: 0,
    selected: undefined,
    x: 0,
    y: 0,
    hoverContent: false,
    hoverContainer: undefined
  };

  gameItemContainerClose = e => {
    if (e.target.className === "selectedGameContainer") {
      this.setState({ selected: undefined });
    }
  };

  // escFunction = event => {
  //   if (event.keyCode === 27) {
  //     this.setState({
  //       selected: undefined
  //     });
  //   }
  // };
  // componentDidMount() {
  //   document.addEventListener("keydown", this.escFunction, false);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.escFunction, false);
  // }

  onMouseMove = e => {
    if (e.target.className === "gameItems") {
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  };

  render() {
    const { hover, currentPage, selected, loading, hoverContent } = this.state;

    const { gamesPerPage, gameData } = this.props;

    const pageNumbers = [];

    let count = 1;

    for (let i = 1; i <= gameData.length; i += gamesPerPage) {
      let max = count * gamesPerPage;
      let min = max - gamesPerPage + 1;
      pageNumbers.push({ min: min, max: max });
      count++;
    }

    return (
      <Contexts.Consumer>
        {context => (
          <div id="container">
            <TransitionGroup id="cardContainer">
              {gameData.length < 1 ? (
                <div>No items found</div>
              ) : (
                gameData
                  .filter(
                    (x, i) =>
                      i + 1 >= pageNumbers[currentPage].min &&
                      i + 1 <= pageNumbers[currentPage].max
                  )
                  .map((games, i) => {
                    const cover = games.hasOwnProperty("cover")
                      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
                          games.cover.image_id
                        }.png`
                      : "https://www.w3schools.com/w3css/img_lights.jpg";

                    // const maxNum = 100;

                    // const summaryTrunc =
                    //   games.hasOwnProperty("summary") &&
                    //   games.summary.length >= maxNum
                    //     ? games.summary.slice(0, maxNum) + " ..."
                    //     : games.summary || "No summary";
                    return (
                      <CSSTransition
                        onClick={() =>
                          context.state.updateUpdateDate(
                            games.updated_at,
                            games.slug
                          )
                        }
                        onMouseMove={this.onMouseMove}
                        key={games.id}
                        timeout={500}
                        classNames="fade"
                      >
                        <Link to={`/games/${games.slug}`}>
                          <div
                            style={{
                              backgroundImage: `url(${cover})`,
                              backgroundSize: "cover"
                            }}
                            className="gameItems"
                            onMouseEnter={() =>
                              this.setState({
                                hover: games.id,
                                hoverContent: true
                              })
                            }
                            onMouseLeave={() => {
                              this.setState({
                                hover: null,
                                hoverContent: false
                              });
                            }}
                          >
                            <div className="gameItemTitle">{games.name}</div>

                            <div
                              style={
                                hoverContent == true && hover === games.id
                                  ? {
                                      top: this.state.y + 20,
                                      left: this.state.x,
                                      visibility: "visible",
                                      opacity: "1"
                                    }
                                  : { visibility: "hidden" }
                              }
                              className="gameItemHoverContent"
                            >
                              {games.summary}
                            </div>

                            {/* {hover === games.id ? (
                      <div>
                        <div className="gameHoverContent">
                          <div className="gameSummary">{summaryTrunc}</div>
                        </div>
                        <div
                          onClick={() => this.setState({ selected: games.id })}
                          className="gameQuickInfo"
                        >
                          ╲╱
                        </div>
                      </div>
                    ) : (
                      undefined
                    )} */}
                          </div>
                        </Link>
                      </CSSTransition>
                    );
                  })
              )}
            </TransitionGroup>
            <div className="pageNumberButtons">
              {pageNumbers.map((pages, i) => (
                <button
                  className={currentPage === i ? "pageActive" : undefined}
                  key={i}
                  onClick={() => this.setState({ currentPage: i })}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {/* {selected !== undefined && (
              <GameItemModal
                gameItemContainerClose={this.gameItemContainerClose}
                gameData={gameData}
                selected={selected}
              />
            )} */}
          </div>
        )}
      </Contexts.Consumer>
    );
  }
}

export default GameList;
