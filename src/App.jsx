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

  const createNewQuestion = async (newQuestion) => {
    const apiResponse = await fetch(`${websiteURL}`, {
      method: "POST",
      body: JSON.stringify(newQuestion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await apiResponse.json();
    if (apiResponse.status === 201) {
      setQuestions([...questions, parsedResponse]);
    } else {
      console.log(parsedResponse);
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
      <Outlet context={[questions, createNewQuestion]} />
    </div>
  );
}

export default App;
