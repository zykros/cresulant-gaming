import React from "react";
import { Link } from "react-router-dom";

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
            : "https://www.w3schools.com/w3css/img_lights.jpg";
          return (
            <div className="similarGames" key={sim.id}>
              <div className="similarGameCover">
                <img alt={sim.name} src={cover} className="simCover" />
              </div>
              <div>
                <Link to={`/games/${sim.slug}`}>{sim.name}</Link>
              </div>
            </div>
          );
        })}
      </div>
      {console.log(props.gameData.similar_games)}
    </div>
  );
};

export default SimilarGames;
