import "./App.css";
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [questions, setQuestions] = useState([]);

  const websiteURL = "http://localhost:8000/api/question";
  const codewarsapi = "https://www.codewars.com/api/v1/code-challenges/";

  const getQuestions = async () => {
    try {
      const questions = await fetch(`${websiteURL}`);
      const parsedQuestions = await questions.json();
      setQuestions(parsedQuestions);
      console.log(questions);
      console.log(parsedQuestions);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(getQuestions, []);
  return (
    <div className="App">
      <h1>Codele</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/daily">Daily</Link>
        <Link to="/questions">Questions</Link>
      </nav>
      <Outlet context={questions} />
    </div>
  );
}

export default App;
