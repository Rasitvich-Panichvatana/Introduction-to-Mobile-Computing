import SelectActionCard from "../components/SelectActionCard";
import Nav from "../components/Nav";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <div className="main">
        <h1 className="title">กระดานกิจกรรม</h1>
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
