import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  const [apiData, setApiData] = useState(null); // Start with null to handle the loading state.

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjYzNTNlNmVkOWUxZmM3ZGE3NDFhMTFjYmZmN2ViNiIsIm5iZiI6MTczNzEzMjk2NS42NDcsInN1YiI6IjY3OGE4YmE1YjlkMWQxMGVmMTk3YzJmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5vljfVGy5FIdCd28qHOQqreBC6Q1dHU5pRL9l5nuxP0",
    },
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const data = await response.json();
        // Assuming the first video is desired
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        } else {
          console.error("No video data found");
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-arrow"
        onClick={() => window.history.back()} // Go back to the previous page
      />
      {apiData ? (
        <>
          <iframe
            className="video-frame"
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>
              <strong>Publish Date:</strong>{" "}
              {new Date(apiData.published_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Name:</strong> {apiData.name}
            </p>
            <p>
              <strong>Type:</strong> {apiData.type}
            </p>
          </div>
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Player;
