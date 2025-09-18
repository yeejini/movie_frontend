import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookingSteps from "./BookingSteps";
import SeatSelection from "./SeatSelection";
import "../css/BookingPage.css";

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
  const [selectedMovie, setSelectedMovie] = useState(location.state?.movie || null);
  const [allMovies, setAllMovies] = useState(location.state?.allMovies || []);

  const [theaters, setTheaters] = useState([]); // API로 받아올 극장 리스트
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // 영화에 따른 상영 극장 불러오기
  useEffect(() => {
    if (!selectedMovie) return;

    fetch(`http://localhost:8080/theaters/${selectedMovie.movieId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("선택한 영화 id:", selectedMovie.movieId);
        console.log("영화 상영 극장:", data);
        setTheaters(data.map((t) => t.theaterName));
      })
      .catch((err) => console.error("극장 불러오기 실패:", err));
  }, [selectedMovie]);


  // 전체 영화 리스트가 없는 경우 fetch
  useEffect(() => {
    if (allMovies.length === 0) {
      fetch("http://localhost:8080/movies")
        .then((res) => res.json())
        .then((data) => {
          setAllMovies(data.map((movie) => ({
            movieId: movie.movie_id,
            title: movie.title,
          })));
        })
        .catch((err) => console.error("전체 영화 불러오기 실패:", err));
    }
  }, [allMovies]);

  const handleNextStep = () => {
    if (currentStep === 1 && selectedTheater && selectedScreen && selectedTime && selectedDate) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

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

  return (
    <div className="booking-page">
      <BookingSteps currentStep={currentStep} />

      <div className="booking-container">
        {/* 영화 리스트 */}
        <div className="movie-list">
          <h3>영화</h3>
          <ul>
  {allMovies.map((movie) => (
    <li
      key={movie.movieId}
      className={selectedMovie?.movieId === movie.movieId ? "active" : ""}
      onClick={() => setSelectedMovie(movie)} // 클릭 시 선택 영화 변경
    >
      {movie.title}
    </li>
  ))}
</ul>
        </div>

        {/* 극장 선택 */}
        <div className="theater-time">
          <h3>상영관/시간 선택</h3>
          <div>
            <strong>지점 선택</strong>
            <ul>
              {theaters.length > 0 ? (
                theaters.map((t) => (
                  <li
                    key={t}
                    className={selectedTheater === t ? "active" : ""}
                    onClick={() => setSelectedTheater(t)}
                  >
                    {t}
                  </li>
                ))
              ) : (
                <li>상영 극장이 없습니다.</li>
              )}
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

        {/* 날짜 선택 */}
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
};

export default BookingPage;
