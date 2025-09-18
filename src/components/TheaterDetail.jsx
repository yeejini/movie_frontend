import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/TheaterDetail.css"; // 새로 만든 theater.css import
import cgv from "../assets/cgv.png";
import lottecinema from "../assets/lotte.png";
import megabox from "../assets/mega.png";

const posterMap = {
  "롯데시네마": lottecinema,
  "CGV": cgv,
  "메가박스": megabox,
};

const TheaterDetail = () => {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출
    fetch("http://localhost:8080/theaters") // TheaterHandler의 GET /theaters
      .then((res) => res.json())
      .then((data) => {
        console.log("백엔드에서 받은 데이터:", data); // 데이터 확인용
        const theatersWithLogo = data.map((theater) => ({
          id: theater.theaterId,                // DB에서 가져온 고유 ID
          name: theater.theaterName,            // 사용자에게 보여줄 이름
          logo: posterMap[theater.theaterName] || "", // 이름 기준 매핑
        }));
        setTheaters(theatersWithLogo);
      })
      .catch((err) => console.error("영화관 목록 로드 실패:", err));
  }, []); // 의존성 배열 추가 (한번만 실행)

  const handleClick = (theater) => {
    console.log("극장 ID:", theater.id);   // 예: T1
    console.log("극장 이름:", theater.name); // 예: 롯데시네마
    // // 추후 좌석예약 페이지로 이동 가능
    // navigate(`/reservation/${theater.id}`);
    navigate("/booking", { state: { theater, allTeater:theaters } });
  };

  return (
    <div className="theater-grid">
      {theaters.map((theater) => (
        <div
          className="theater-card"
          key={theater.id}
          onClick={() => handleClick(theater)}
        >
          <img src={theater.logo} alt={theater.name} />
          <h3>{theater.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default TheaterDetail;
