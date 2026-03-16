import "./Credit.css";
import { useNavigate } from "react-router-dom";

function Credit() {
  let navigate = useNavigate();
  return (
    <>
      <div>
        <h1>คณะผู้จัดทำ</h1>
        <h2>
          6634459423 นายรษิตวิชญ์ พานิชวัฒนา <br />
          6634419323 นางสาวดลธิชา โตเขียว
        </h2>
      </div>
      <br />
      <div className="nav">
        <button onClick={() => navigate("/main")}>Home</button>
        <button onClick={() => navigate("/")}>Sign out</button>
      </div>
    </>
  );
}

export default Credit;
