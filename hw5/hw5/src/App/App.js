import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/credit")}>Credit</button>
      <button onClick={() => navigate("/")}>Sign out</button>
    </div>
  );
}

export default App;
