import React from "react";
import { useNavigate } from "react-router-dom"; // ← useNavigate import
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate(); // ← navigate 정의

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>CHOIKANG CINEMA</h1>
        <form className="login-form">
          <div>
            <input type="text" placeholder="아이디를 입력해주세요" required />
          </div>
          <div>
            <input type="password" placeholder="비밀번호" required />
          </div>
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">아이디 기억하기</label>
          </div>
          <button type="submit">로그인</button>
          <button type="button" onClick={() => navigate("/signup")}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
