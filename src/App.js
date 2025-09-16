import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Header /> {/* 공통 헤더 */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movieList" element={<MovieList />} />
      </Routes>
    </Router>
  );
}

export default App;
