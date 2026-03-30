import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(nationalId, password);

      navigate("/main");
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <br />

      <input
        className="register-input"
        type="text"
        placeholder="National ID"
        value={nationalId}
        onChange={(e) => setNationalId(e.target.value)}
      />

      <br />

      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button className="register-submit" onClick={handleLogin}>
        สมัครสมาชิก
      </button>

      <br />
      <a className="register-login" onClick={() => navigate("/login")}>
        เข้าสู่ระบบ
      </a>
    </div>
  );
}

export default Register;
