import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BookingSteps from "./BookingSteps";
import SeatSelection from "./SeatSelection";
import "../css/BookingPage.css";

const theaters = ["경기광주", "광교", "구리", "기흥", "김포", "통탄", "배곧", "부천"];
const screens = {
  "1관": ["11:00", "14:00", "17:00", "20:00", "24:00"],
  "2관": ["10:00", "12:50", "15:45", "18:40", "21:30"],
  "7관": ["09:30", "12:30", "15:30", "19:40", "22:00"],
};

const dates = [
  "2025-09-16",
  "2025-09-17",
  "2025-09-18",
  "2025-09-19",
  "2025-09-20",
];

const BookingPage = () => {
  const location = useLocation();
  const selectedMovie = location.state?.movie || null;

  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계 관리
  const [selectedDate, setSelectedDate] = useState(""); // 날짜 선택 상태 추가


  const handleNextStep = () => {
    if (currentStep === 1 && selectedTheater && selectedScreen && selectedTime) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 좌석 선택 페이지 렌더링 (기존 booking CSS와 분리)
  if (currentStep === 2) {
    return (
      <div>
        <BookingSteps currentStep={currentStep} />
        <SeatSelection
          selectedMovie={selectedMovie}
          selectedTheater={selectedTheater}
          selectedScreen={selectedScreen}
          selectedTime={selectedTime}
          onNext={handleNextStep}
          onBack={handlePrevStep}
        />
      </div>
    );
  }

  // ...existing code...
  return (
    <div className="booking-page">
      <BookingSteps currentStep={currentStep} />

      <div className="booking-container">
        {/* 영화 리스트 */}
        <div className="movie-list">
          <h3>영화</h3>
          <ul>
            {[
              "Spider-Man",
              "DUNE",
              "Don't Look Up",
              "Amelie Of Montmartre",
              "Encanto",
              "Titane",
              "The French Dispatch",
              "My Salinger Year",
            ].map((title) => (
              <li
                key={title}
                className={selectedMovie?.title === title ? "active" : ""}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>

        {/* 상영관/시간 선택 UI를 theater-time 영역으로 이동 */}
        <div className="theater-time">
          <h3>상영관/시간 선택</h3>
          <div>
            <strong>지점 선택</strong>
            <ul>
              {theaters.map((t) => (
                <li
                  key={t}
                  className={selectedTheater === t ? "active" : ""}
                  onClick={() => setSelectedTheater(t)}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {selectedTheater && (
            <div className="screens">
              {Object.entries(screens).map(([screen, times]) => (
                <div key={screen} className="screen">
                  <h4>{screen}</h4>
                  <div className="times">
                    {times.map((time) => (
                      <button
                        key={time}
                        className={selectedTime === time ? "active" : ""}
                        onClick={() => {
                          setSelectedScreen(screen);
                          setSelectedTime(time);
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 날짜 선택을 ticket-info 영역으로 이동 */}
        <div className="ticket-info">
          <h3>날짜 선택</h3>
          <ul>
            {dates.map((date) => (
              <li
                key={date}
                className={selectedDate === date ? "active" : ""}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </li>
            ))}
          </ul>
          <button
            className="next-btn"
            onClick={handleNextStep}
            disabled={!selectedDate || !selectedTheater || !selectedScreen || !selectedTime}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
// ...existing code...
};

export default BookingPage;