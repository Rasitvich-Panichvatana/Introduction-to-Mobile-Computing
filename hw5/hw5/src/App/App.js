import SelectActionCard from "../components/SelectActionCard";
import Nav from "../components/Nav";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <div className="main">
        <h2 className="title">กิจกรรม</h2>
        <div className="button-container">
          <button className="add">Add</button>
          <button className="edit">Edit</button>
          <button className="remove">Remove</button>
        </div>
        <SelectActionCard />
      </div>
    </>
  );
}

export default App;
