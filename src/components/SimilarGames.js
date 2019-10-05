import React from "react";
import { Link } from "react-router-dom";
import { FaStarAndCrescent, FaStar } from "react-icons/fa";
import logo from "../assets/cresulant_logo.png";

import "../styles/SimilarGames.css";

const SimilarGames = props => {
  return (
    <div>
      <div>
        {props.gameData.similar_games.map(sim => {
          const cover = sim.hasOwnProperty("cover")
            ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${
                sim.cover.image_id
              }.png`
            : logo;
          return (
            <Link
              className="similarGames"
              key={sim.id}
              to={`/games/${sim.slug}`}
            >
              <div className="similarGameCover">
                <img alt={sim.name} src={cover} className="simCover" />
              </div>
              <div>
                <div className="similarGamesTitle">{sim.name}</div>
                <div className="similarGamesDetails">
                  <div>
                    {sim.hasOwnProperty("release_dates")
                      ? sim.release_dates[0].human
                      : undefined}
                  </div>
                </div>
                <div className="similarGamesRatingContainer">
                  {sim.hasOwnProperty("rating") ? (
                    <div>
                      <FaStar style={{ color: "gold" }} />{" "}
                      <span>{sim.rating.toFixed(2)}</span>
                    </div>
                  ) : (
                    <div>Unrated</div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarGames;
