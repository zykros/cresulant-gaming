import React, { Component } from "react";
import { FaCogs, FaStarAndCrescent } from "react-icons/fa";

import fire from "../firebase/Firebase";

import moment from "moment";

import { Contexts } from "../Provider/Provider";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import "../styles/Reviews.css";

class Reviews extends Component {
  state = {
    title: "",
    message: "",
    platforms: "",
    date: Date.now(),
    modalShow: false,
    showReviewOptions: false,
    selectedReviewBox: "",
    storyRatingHover: 0,
    storyRatingSelected: 0,
    gameplayRatingHover: 0,
    gameplayRatingSelected: 0,
    graphicRatingHover: 0,
    graphicRatingSelected: 0,
    soundtrackRatingHover: 0,
    soundtrackRatingSelected: 0,
    longevityRatingHover: 0,
    longevityRatingSelected: 0,
    replayabilityRatingHover: 0,
    replayabilityRatingSelected: 0
  };

  submitReview = e => {
    e.preventDefault();
    const db = fire.firestore();
    if (
      this.state.gameplayRatingSelected === 0 ||
      this.state.graphicRatingSelected === 0 ||
      this.state.storyRatingSelected === 0 ||
      this.state.soundtrackRatingSelected === 0 ||
      this.state.longevityRatingSelected === 0 ||
      this.state.replayabilityRatingSelected === 0 ||
      this.state.title === "" ||
      this.state.message === ""
    ) {
      alert("One or more of the required fields are not filled");
    } else if (
      this.props.reviews.findIndex(x => x.uid === this.props.currentUser.uid) >
      -1
    ) {
      alert("trying to be sneaky and review a second time huh? NO WAY!");
    } else {
      const userRef = db
        .collection("reviews")
        .doc(`${this.props.currentUser.uid}@${this.state.date}`)
        .set({
          reviewID: `${this.props.currentUser.uid}@${this.state.date}`,
          uid: this.props.currentUser.uid,
          date: moment(this.state.date).format("MM/DD/YYYY"),
          time: moment(this.state.date).format("hh:mm A"),
          platform: this.state.platforms,
          message: this.state.message,
          title: this.state.title,
          displayName: this.props.currentUser.displayName,
          slug: this.props.gameData.slug,
          gameplayRating: this.state.gameplayRatingSelected,
          soundtrack: this.state.soundtrackRatingSelected,
          longevity: this.state.longevityRatingSelected,
          replayability: this.state.replayabilityRatingSelected,
          story: this.state.storyRatingSelected,
          graphics: this.state.graphicRatingSelected
        });
      this.setState({
        title: "",
        message: "",
        platforms: "",
        modalShow: false
      });

      this.props.firestoreGetData();
    }
  };

  closeReviewModal = e => {
    if (e.target.className === "reviewModalContainer") {
      this.setState({
        modalShow: false
      });
    }
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      message,
      modalShow,
      showReviewOptions,
      selectedReviewBox,
      storyRatingHover,
      storyRatingSelected,
      gameplayRatingHover,
      gameplayRatingSelected,
      graphicRatingHover,
      graphicRatingSelected,
      soundtrackRatingHover,
      soundtrackRatingSelected,
      longevityRatingHover,
      longevityRatingSelected,
      replayabilityRatingHover,
      replayabilityRatingSelected
    } = this.state;
    const { currentUser, reviews, gameData } = this.props;

    const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <Contexts.Consumer>
        {context => (
          <div className="reviewContainer">
            <div
              onClick={this.closeReviewModal}
              style={
                modalShow ? { visibility: "visible" } : { visibility: "hidden" }
              }
              className="reviewModalContainer"
            >
              <div className="reviewModal">
                {currentUser !== null ? (
                  <form onSubmit={this.submitReview}>
                    <div className="ratings">
                      <div>Story: </div>
                      <div
                        className="ratingsLeft"
                        onMouseLeave={() =>
                          this.setState({ storyRatingHover: 0 })
                        }
                      >
                        {rating.map(rating => {
                          return (
                            <FaStarAndCrescent
                              onClick={() =>
                                this.setState({ storyRatingSelected: rating })
                              }
                              style={
                                storyRatingSelected >= rating
                                  ? { color: "red" }
                                  : storyRatingHover >= rating
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              onMouseEnter={e => {
                                this.setState({ storyRatingHover: rating });
                              }}
                              key={rating}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="ratings">
                      <div>Gameplay: </div>
                      <div
                        className="ratingsLeft"
                        onMouseLeave={() =>
                          this.setState({ gameplayRatingHover: 0 })
                        }
                      >
                        {rating.map(rating => {
                          return (
                            <FaStarAndCrescent
                              onClick={() =>
                                this.setState({
                                  gameplayRatingSelected: rating
                                })
                              }
                              style={
                                gameplayRatingSelected >= rating
                                  ? { color: "red" }
                                  : gameplayRatingHover >= rating
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              onMouseEnter={e => {
                                this.setState({ gameplayRatingHover: rating });
                              }}
                              key={rating}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="ratings">
                      <div>Graphics: </div>
                      <div
                        className="ratingsLeft"
                        onMouseLeave={() =>
                          this.setState({ graphicRatingHover: 0 })
                        }
                        name="graphics"
                      >
                        {rating.map(rating => {
                          return (
                            <FaStarAndCrescent
                              id="graphicRating"
                              onClick={() =>
                                this.setState({
                                  graphicRatingSelected: rating
                                })
                              }
                              style={
                                graphicRatingSelected >= rating
                                  ? { color: "red" }
                                  : graphicRatingHover >= rating
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              onMouseEnter={e => {
                                this.setState({ graphicRatingHover: rating });
                              }}
                              key={rating}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="ratings">
                      <div>Soundtrack: </div>
                      <div
                        className="ratingsLeft"
                        onMouseLeave={() =>
                          this.setState({ soundtrackRatingHover: 0 })
                        }
                      >
                        {rating.map(rating => {
                          return (
                            <FaStarAndCrescent
                              onClick={() =>
                                this.setState({
                                  soundtrackRatingSelected: rating
                                })
                              }
                              style={
                                soundtrackRatingSelected >= rating
                                  ? { color: "red" }
                                  : soundtrackRatingHover >= rating
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              onMouseEnter={e => {
                                this.setState({
                                  soundtrackRatingHover: rating
                                });
                              }}
                              key={rating}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="ratings">
                      <div>Longevity: </div>
                      <div
                        className="ratingsLeft"
                        onMouseLeave={() =>
                          this.setState({ longevityRatingHover: 0 })
                        }
                      >
                        {rating.map(rating => {
                          return (
                            <FaStarAndCrescent
                              onClick={() =>
                                this.setState({
                                  longevityRatingSelected: rating
                                })
                              }
                              style={
                                longevityRatingSelected >= rating
                                  ? { color: "red" }
                                  : longevityRatingHover >= rating
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              onMouseEnter={e => {
                                this.setState({ longevityRatingHover: rating });
                              }}
                              key={rating}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div className="ratings">
                      <div>Replayability: </div>
                      <div
                        className="ratingsLeft"
                        onMouseLeave={() =>
                          this.setState({ replayabilityRatingHover: 0 })
                        }
                      >
                        {rating.map(rating => {
                          return (
                            <FaStarAndCrescent
                              onClick={() =>
                                this.setState({
                                  replayabilityRatingSelected: rating
                                })
                              }
                              style={
                                replayabilityRatingSelected >= rating
                                  ? { color: "red" }
                                  : replayabilityRatingHover >= rating
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              onMouseEnter={e => {
                                this.setState({
                                  replayabilityRatingHover: rating
                                });
                              }}
                              key={rating}
                            />
                          );
                        })}
                      </div>
                    </div>
                    {gameData.hasOwnProperty("platforms") ? (
                      <div>
                        <div>Platform: </div>
                        <select
                          className="reviewPlatformStyle"
                          required
                          onChange={this.changeHandler}
                          name="platforms"
                        >
                          <option selected disabled>
                            Select Platform
                          </option>
                          {gameData.platforms.map(platform => (
                            <option key={platform.name} value={platform.name}>
                              {platform.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      undefined
                    )}
                    <div>
                      <div>Title: </div>
                      <input
                        className="reviewTitle"
                        onChange={this.changeHandler}
                        name="title"
                        type="text"
                      />
                    </div>
                    <div>
                      <div>Message: </div>
                      <textarea
                        className="reviewMessage"
                        onChange={this.changeHandler}
                        name="message"
                        type="text"
                      />
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>{message}</div>
                    <button type="submit">Submit Review</button>
                  </form>
                ) : (
                  <div>Please login to review</div>
                )}
              </div>
            </div>
            {currentUser === null ? (
              <div>
                Please{" "}
                <button
                  style={{
                    border: "1px ridge white",
                    background: "transparent",
                    padding: "5px"
                  }}
                  onClick={context.state.loginModalHandler}
                >
                  login
                </button>{" "}
                to review.
              </div>
            ) : reviews.findIndex(
                reviews => reviews.uid === currentUser.uid
              ) === -1 ? (
              <button onClick={() => this.setState({ modalShow: true })}>
                Add Review
              </button>
            ) : (
              <div>Reviewed already!</div>
            )}
            <div className="reviewBoxContainer">
              {reviews.length < 1 ? (
                <div>Be the first to review this game!</div>
              ) : (
                reviews.map(review => {
                  return (
                    <div
                      onClick={e =>
                        this.setState({
                          selectedReviewBox: review.reviewID
                        })
                      }
                      style={
                        currentUser !== null
                          ? currentUser.uid === review.uid
                            ? { order: "-1" }
                            : undefined
                          : undefined
                      }
                      className="reviewBox"
                    >
                      <div className="ratingCard">
                        <div>{review.displayName}</div>
                        <div>
                          <div>{review.date} </div>
                          <div>{review.time}</div>
                        </div>
                        <div>Gameplay: {review.gameplayRating}/5</div>
                        <div>Soundtrack: {review.soundtrack}/5</div>
                        <div>Story: {review.story}/5</div>
                        <div>Longevity: {review.longevity}/5</div>
                        <div>Graphics: {review.graphics}/5</div>
                        <div>Replayability: {review.replayability}/5</div>
                      </div>
                      <div className="reviewContent">
                        <div>{review.title}</div>
                        <div>{review.platform}</div>
                        <div>{review.message}</div>
                        <div>
                          Overall Rating:{" "}
                          {(
                            (Number(review.gameplayRating) +
                              Number(review.soundtrack) +
                              Number(review.story) +
                              Number(review.longevity) +
                              Number(review.replayability) +
                              Number(review.graphics)) /
                            6
                          ).toFixed(2)}
                        </div>
                      </div>
                      {currentUser !== null && currentUser.uid === review.uid && (
                        <FaCogs
                          onClick={() =>
                            this.setState({
                              showReviewOptions: !this.state.showReviewOptions
                            })
                          }
                          style={{ color: "red" }}
                          className="reviewSettings"
                        />
                      )}
                      <div
                        style={
                          showReviewOptions &&
                          selectedReviewBox === review.reviewID
                            ? { height: "100%" }
                            : { height: "0px" }
                        }
                        className="reviewOptions"
                      >
                        <div>test</div>
                        <div>test</div>
                        <div>test</div>
                        <div>test</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </Contexts.Consumer>
    );
  }
}

export default Reviews;
