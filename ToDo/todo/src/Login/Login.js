import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  return (
    <div className="login-container">
      <h2>Login</h2>
      <br />
      <input className="input" type="text" placeholder="User ID" />
      <br />
      <input className="input" type="password" placeholder="Password" />
      <br />
      <button className="submit" onClick={() => navigate("/main")}>
        เข้าสู่ระบบ
      </button>
    </div>
  );
}

export default Login;
