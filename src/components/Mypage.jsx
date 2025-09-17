import React, { useEffect, useState } from "react"; // useEffect 추가
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "../css/MyPage.css";

const MyPage = () => {
  const navigate = useNavigate(); // navigate 정의
  const [tickets] = useState([
    { movieName: "영화 A", theater: "강남", screen: "1관", seat: "A1", time: "12:00" },
    { movieName: "영화 B", theater: "광교", screen: "2관", seat: "B5", time: "15:30" },
    { movieName: "영화 C", theater: "부천", screen: "3관", seat: "C7", time: "18:45" },
  ]);

  useEffect(() => {
    const currentId = localStorage.getItem("currentId");
    if (!currentId) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, []); // navigate를 의존성에서 제거

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>
      <h2>예매 내역</h2>
      {tickets.length === 0 ? (
        <p>예매 내역이 없습니다.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>영화 제목</th>
              <th>극장</th>
              <th>관</th>
              <th>좌석</th>
              <th>시간</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.movieName}</td>
                <td>{ticket.theater}</td>
                <td>{ticket.screen}</td>
                <td>{ticket.seat}</td>
                <td>{ticket.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPage;
