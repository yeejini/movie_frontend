import React, { useState } from "react";
import "../css/SeatSelection.css";

const SeatSelection = ({ 
  selectedMovie, 
  selectedTheater, 
  selectedScreen, 
  selectedTime,
  onNext,
  onBack 
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 좌석 데이터 (A~J행, 1~19열)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 19;

  // 이미 예약된 좌석 (예시)
  const bookedSeats = ['D13', 'F7', 'F8', 'G10', 'H5'];

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatStatus = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const totalPrice = selectedSeats.length * 10000;

  return (
    <div className="seat-selection">
      <div className="seat-container">
        {/* 스크린 */}
        <div className="screen">
          <div className="screen-text">SCREEN</div>
        </div>

        {/* 좌석 맵 */}
        <div className="seats-map">
          {rows.map(row => (
            <div key={row} className="seat-row">
              <div className="row-label">{row}</div>
              <div className="seats">
                {Array.from({ length: seatsPerRow }, (_, index) => {
                  const seatNumber = index + 1;
                  const seatId = `${row}${seatNumber}`;
                  return (
                    <button
                      key={seatId}
                      className={`seat ${getSeatStatus(seatId)}`}
                      onClick={() => handleSeatClick(seatId)}
                      disabled={bookedSeats.includes(seatId)}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 범례 */}
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-seat available"></div>
            <span>선택가능</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat selected"></div>
            <span>선택됨</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat booked"></div>
            <span>예약완료</span>
          </div>
        </div>
      </div>

      {/* 티켓 정보 */}
      <div className="ticket-info">
        <h3>티켓 정보</h3>
        <div className="ticket-box">
          <p><strong>{selectedMovie?.title || "Don't Look Up"}</strong></p>
          <p>지점: {selectedTheater}</p>
          <p>상영관: {selectedScreen}</p>
          <p>시간: {selectedTime}</p>
          <p>좌석: {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</p>
        </div>
        <div className="price">총 금액: {totalPrice.toLocaleString()}원</div>
        
        <div className="button-group">
          <button className="prev-btn" onClick={onBack}>
            이전단계
          </button>
          <button 
            className="next-btn" 
            onClick={onNext}
            disabled={selectedSeats.length === 0}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;