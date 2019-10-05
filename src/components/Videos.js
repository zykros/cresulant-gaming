import React, { Component } from "react";

import "../styles/Videos.css";

class Videos extends Component {
  state = {
    selectedVideoId: undefined
  };

  render() {
    const { selectedVideoId } = this.state;
    const { games } = this.props;
    return (
      <div>
        <div className="videoThumbContainer">
          {games.hasOwnProperty("videos")
            ? games.videos.map(video => {
                const videoThumb = `https://i.ytimg.com/vi/${
                  video.video_id
                }/mqdefault.jpg`;
                return (
                  <div
                    onClick={() =>
                      this.setState({ selectedVideoId: video.video_id })
                    }
                    key={video.video_id}
                    className="videoItems"
                  >
                    <img
                      alt={video.name}
                      src={videoThumb}
                      className="videoItem"
                    />
                    <div className="videoTitle">{video.name}</div>
                  </div>
                );
              })
            : undefined}
        </div>
        <div
          style={
            selectedVideoId === undefined
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
          className="iframeBackgroundContainer"
          onClick={e =>
            e.target.className === "iframeBackgroundContainer"
              ? this.setState({ selectedVideoId: undefined })
              : undefined
          }
        >
          <iframe
            className="iframeYT"
            style={
              games.hasOwnProperty("videos")
                ? games.videos.findIndex(x => x.video_id === selectedVideoId)
                  ? { transform: "scale(1)" }
                  : undefined
                : undefined
            }
            title={selectedVideoId}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowFullScreen"
          />
        </div>
      </div>
    );
  }
}

export default Videos;
