import React from "react";
import "../css/TheaterDetail.css"; // 새로 만든 theater.css import
import cgv from "../assets/cgv.png"
import lottecinema from "../assets/lotte.png"
import megabox from "../assets/mega.png"

const theaters = [
  {
    id: 1,
    name: "CGV",
    logo: cgv,
  },
  {
    id: 2,
    name: "롯데시네마",
    logo: lottecinema,
  },
  {
    id: 3,
    name: "메가박스",
    logo: megabox,
  },
];

const TheaterDetail = () => {
  return (
    <div className="theater-grid">
      {theaters.map((theater) => (
        <div className="theater-card" key={theater.id}>
          <img src={theater.logo} alt={theater.name} />
          <h3>{theater.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default TheaterDetail;
