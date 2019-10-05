import React from "react";

import "../styles/GameList.css";

const GameItemModal = props => {
  const { selected, gameData } = props;

  const selectedGamesIndex = gameData.findIndex(x => x.id === selected);

  const screenshot = gameData[selectedGamesIndex].hasOwnProperty("screenshots")
    ? `url(https://images.igdb.com/igdb/image/upload/t_1080p/${
        gameData[selectedGamesIndex].screenshots[0].image_id
      }.jpg)`
    : "url(https://i.imgur.com/HlmWDMU.jpg)";

  return (
    <div>
      <div
        key={"selectedContainer_" + gameData[selectedGamesIndex].id}
        style={{
          backgroundImage: screenshot
        }}
        className={
          selected === gameData[selectedGamesIndex].id
            ? "selectedGameContainer"
            : undefined
        }
        onClick={props.gameItemContainerClose}
      />
      <div
        key={"selectedGameItem_" + gameData[selectedGamesIndex].id}
        className="selectedGameItem"
        onKeyDown={props.gameItemContainerClose}
      >
        <div className="selectedItemTrailer">
          <iframe
            title={gameData[selectedGamesIndex].name}
            width="100%"
            height="409"
            src={`https://www.youtube.com/embed/${
              gameData[selectedGamesIndex].hasOwnProperty("videos")
                ? gameData[selectedGamesIndex].videos[0].video_id
                : undefined
            }`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowFullScreen"
          />
        </div>
        <div className="selectedItemTitle">
          {gameData[selectedGamesIndex].name}
        </div>
        <div className="selectedGameSummary">
          {gameData[selectedGamesIndex].summary || "No summary yet"}
        </div>
      </div>
      ); })})
    </div>
  );
};

export default GameItemModal;
