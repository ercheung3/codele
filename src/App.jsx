import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Codele</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/daily">Daily</Link>
        <Link to="/questions">Questions</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
