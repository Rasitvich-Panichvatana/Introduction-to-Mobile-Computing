import Nav from "../components/Nav";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  return (
    <>
      <Nav />
    </>
  );
}

export default App;
