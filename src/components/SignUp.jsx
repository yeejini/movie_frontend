import React, { useState } from "react";
import "../css/SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 백엔드로 회원가입 요청
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `id=${encodeURIComponent(id)}&pw=${encodeURIComponent(pw)}`
    });
    if (res.ok) {
      alert("회원가입 완료!");
      navigate("/login");
    } else {
      alert("회원가입 실패!");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>회원가입</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="사용자 이름" required value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="text" placeholder="아이디" required value={id} onChange={e => setId(e.target.value)} />
          </div>
          <div className="input-group">
            <input type="password" placeholder="비밀번호" required value={pw} onChange={e => setPw(e.target.value)} />
          </div>
          <button type="submit" className="signup-btn">회원가입</button>
          <button type="button" className="back-btn" onClick={() => navigate("/login")}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;