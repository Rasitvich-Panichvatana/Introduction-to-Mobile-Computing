import Activity from "../components/Activity";
import ActivityCard from "../components/ActivityCard";
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
        <ActivityCard />
      </div>
    </>
  );
}

export default App;
