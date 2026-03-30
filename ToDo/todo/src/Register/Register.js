import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authApi";
import TextField from "@mui/material/TextField";

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
      <div className="register-input-group">
        <label>Title</label>
        <input
          className="register-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="register-input-group">
        <label>First name</label>
        <input
          className="register-input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="register-input-group">
        <label>Last Name</label>
        <input
          className="register-input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="register-input-group">
        <label>National ID</label>
        <input
          className="register-input"
          type="text"
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
      </div>

      <div className="register-input-group">
        <label>Password</label>
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p className="warning">
        {!nationalId || !password || !title || !firstName || !lastName
          ? "*โปรดกรอกข้อมูลให้ครบทุกช่อง*"
          : ""}
      </p>

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
