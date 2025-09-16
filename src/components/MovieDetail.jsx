import React from "react";
import "../css/MovieDetail.css"; // 기존 MovieList 스타일 재사용
// 로컬 이미지 import
import spiderman from "../assets/spiderman.png";
import dune from "../assets/dune.png";
import dontLookUp from "../assets/donlookup.png";

const movies = [
  {
    rank: 1,
    title: "Spider-Man",
    poster: spiderman,
    rate: "예매율 35.6%",
    release: "개봉일: 2021.12.15",
    likes: 691,
    comments: 202,
    views: 6,
  },
  {
    rank: 2,
    title: "DUNE",
    poster: dune,
    rate: "예매율 23.0%",
    release: "개봉일: 2021.10.20",
    likes: 917,
    comments: 295,
    views: 25,
  },
  {
    rank: 3,
    title: "Don’t Look Up",
    poster: dontLookUp,
    rate: "예매율 21.0%",
    release: "개봉일: 2021.12.08",
    likes: 295,
    comments: 178,
    views: 37,
  },
];

const MovieDetail = () => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.rank}>
          <div className="rank">{movie.rank} 위</div>
          <img src={movie.poster} alt={movie.title} className="poster" />
          <h3>{movie.title}</h3>
          <p className="rate">{movie.rate}</p>
          <p className="release">{movie.release}</p>
          <div className="stats">
            <span>👍 {movie.likes}</span>
            <span>💬 {movie.comments}</span>
            <span>👁 {movie.views}</span>
          </div>
          <button className="reserve-btn">예매하기</button>
        </div>
      ))}
    </div>
  );
};

export default MovieDetail;
