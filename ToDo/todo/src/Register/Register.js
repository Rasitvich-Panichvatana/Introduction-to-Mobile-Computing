import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    try {
      await register({
        nationalId,
        password,
        title,
        firstName,
        lastName,
      });
      alert("Register success");
    } catch (err) {
      alert(err.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <br />

      <input
        className="register-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        className="register-input"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br />

      <input
        className="register-input"
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

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

      <button
        className="register-submit"
        onClick={handleRegister}
        disabled={!nationalId || !password || !title || !firstName || !lastName}
      >
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
