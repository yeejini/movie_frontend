import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MyPage from "./components/Mypage";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import BookingPage from "./components/BookingPage";

function App() {
  return (
    <Router>
      <Header /> {/* 공통 헤더 */}
      <Routes>
        {/* <Route path="/" element={<MovieDetail />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/movieList" element={<MovieList />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
