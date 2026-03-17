import Activity from "../components/Activity";
import Nav from "../components/Nav";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <div className="main">
        <h2 className="title">กิจกรรม</h2>
        <button className="add">Add</button>
        <Activity />
      </div>
    </>
  );
}

export default App;
