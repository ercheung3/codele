import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Bookkeeper</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/daily">Daily</Link>
        <Link to="/questions">Questions</Link>
      </nav>
    </div>
  );
}

export default App;
