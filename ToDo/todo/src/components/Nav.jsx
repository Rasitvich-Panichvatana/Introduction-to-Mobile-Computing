import { useNavigate } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
    let navigate = useNavigate();
  return (
    <div className="nav">
        <div>
        <button onClick={() => navigate("/main")}>Home</button>
        <button onClick={() => navigate("/credit")}>Credit</button>
        </div>
        <button onClick={() => navigate("/")}>Sign out</button>
    </div>
  )
}

export default Nav