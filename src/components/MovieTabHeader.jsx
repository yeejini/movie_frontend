import React, { useState } from "react";
import MovieDetail from "./MovieDetail";
import TheaterDetail from "./TheaterDetail";
import "../css/Header.css";

function TabHeader() {
  const [activeTab, setActiveTab] = useState("movie"); // 기본값: 영화별 예매

  return (
    <div>
      {/* 상단 탭 */}
      <div className="tab-header" style={{ backgroundColor: "white", padding: "10px" }}>
        <button
          className={activeTab === "movie" ? "active" : ""}
          onClick={() => setActiveTab("movie")}
        >
          영화별 예매
        </button>
        <button
          className={activeTab === "theater" ? "active" : ""}
          onClick={() => setActiveTab("theater")}
        >
          극장별 예매
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="tab-content">
        {activeTab === "movie" && <MovieDetail />}
        {activeTab === "theater" && <TheaterDetail />}
      </div>
    </div>
  );
}

export default TabHeader;
