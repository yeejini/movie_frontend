import React from "react";
import TabHeader from "./MovieTabHeader";
// import "./MovieList.css";

const MovieList = () => {
  return (
    <div className="movie-page">
      <h2>
        Movie <span className="sub-title">현재 상영중</span>
      </h2>

      {/* 상단 탭 */}
      <TabHeader />
    </div>
  );
};

export default MovieList;
