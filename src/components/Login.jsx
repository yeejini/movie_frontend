import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지

    try {
      const response = await fetch("http://localhost:8080/login", { // LoginHandler 경로
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${encodeURIComponent(id)}&pw=${encodeURIComponent(pw)}`
      });

      const text = await response.text();

      if (response.status === 200) {
        alert(text);
        localStorage.setItem("currentId", id); // 로그인 세션 저장
        navigate("/mypage");
      } else {
        alert(text); // 실패 시 메시지 표시
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>CHOIKANG CINEMA</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">아이디 기억하기</label>
          </div>
          <button type="submit">로그인</button>
          <button type="button" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
