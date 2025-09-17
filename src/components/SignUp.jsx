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
  try {
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${encodeURIComponent(username)}&id=${encodeURIComponent(id)}&pw=${encodeURIComponent(pw)}`
    });
   if (res.ok) {
  alert("회원가입 완료!");
  navigate("/login");
} else {
  const errorMsg = await res.text();
  alert(`회원가입 실패! 응답 코드: ${res.status}\n메시지: ${errorMsg}`);
}
  } catch (error) {
    alert("회원가입 요청 실패: " + error.message);
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
  <input
    type="number"
    placeholder="비밀번호(4자리 숫자)"
    required
    value={pw}
    onChange={e => setPw(e.target.value)}
    min="1000"
    max="9999"
  />
</div>
          <button type="submit" className="signup-btn">회원가입</button>
          <button type="button" className="back-btn" onClick={() => navigate("/login")}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;