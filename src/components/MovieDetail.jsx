import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MovieDetail.css";

// 로컬 포스터 이미지 import
import spiderman from "../assets/spiderman.png";
import zombieDaughter from "../assets/zombieDaughter.png";
import kimetsu from "../assets/kimetsu.png";
import f1 from "../assets/f1.png";
import squidGame from "../assets/squidGame.png";
import inception from "../assets/inception.png";
import thor from "../assets/thor.png";


// 영화 제목 기준 포스터 매핑
const posterMap = {
  "스파이더맨": spiderman,
  "좀비딸": zombieDaughter,
  "귀멸의칼날": kimetsu,
  "F1": f1,
  "오징어게임": squidGame,
  "인셉션": inception,
  "토르:러브앤썬더": thor,
};

const MovieDetail = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

   useEffect(() => {
    // 백엔드 API 호출
    fetch("http://localhost:8080/movies") // MovieHandler의 GET /movie
      .then((res) => res.json())
      .then((data) => {
        console.log("백엔드에서 받은 데이터:", data); // 데이터 확인용
        const moviesWithPoster = data.map((movie, index) => ({
          ...movie,
          rank: index + 1,
          poster: posterMap[movie.title] || "", // 제목 기준 매핑
          rate: "예매율 N%", // 필요시 백엔드에서 받아오도록 수정 가능
          release: "개봉일: YYYY.MM.DD", // 필요시 백엔드에서 받아오도록 수정 가능
          likes: 0,
          comments: 0,
          views: 0,
        }));
        setMovies(moviesWithPoster);
      })
      .catch((err) => console.error("영화 목록 로드 실패:", err));
  }, []);

  const handleReserve = (movie) => {
    navigate("/booking", { state: { movie } });
  };

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.movieId}>
          <div className="rank">{movie.rank} 위</div>
          {movie.poster && <img src={movie.poster} alt={movie.title} className="poster" />}
          <h3>{movie.title}</h3>
          <p className="rate">{movie.rate}</p>
          <p className="release">{movie.release}</p>
          <div className="stats">
            <span>👍 {movie.likes}</span>
            <span>💬 {movie.comments}</span>
            <span>👁 {movie.views}</span>
          </div>
          <button className="reserve-btn" onClick={() => handleReserve(movie)}>
            예매하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieDetail;