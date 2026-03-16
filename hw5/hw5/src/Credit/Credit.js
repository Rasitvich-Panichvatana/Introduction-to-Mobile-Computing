import Nav from "../components/Nav";
import "./Credit.css";

function Credit() {
  return (
    <>
      <Nav />
      <div className="text-container">
        <h1 className="title">คณะผู้จัดทำ</h1>
        <br />
        <h2 className="names">
          6634459423 นายรษิตวิชญ์ พานิชวัฒนา <br />
          6634419323 นางสาวดลธิชา โตเขียว
        </h2>
      </div>
      <br />
    </>
  );
}

export default Credit;
