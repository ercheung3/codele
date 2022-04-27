import "./App.css";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [questions, setQuestions] = useState([]);

  const websiteURL = "http://localhost:8000/api/question";
  //const codewarsapi = "https://www.codewars.com/api/v1/code-challenges/";

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

  /**
   * @name updateQuestion
   * @description Sends an API response to update specific question with idToUpdate
   * @param {String} idToUpdate
   * @param {Object} questionToUpdate
   * @returns null
   */
  const updateQuestion = async (idToUpdate, questionToUpdate) => {
    const apiResponse = await fetch(`${websiteURL}/${idToUpdate}`, {
      method: "PUT",
      body: JSON.stringify(questionToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResponse = await apiResponse.json();
    if (apiResponse.status === 200) {
      //Simple one line to add updated item
      const newQuestions = questions.map((question) =>
        question.id === idToUpdate ? questionToUpdate : question
      );
      setQuestions(newQuestions);
    } else {
      console.log(parsedResponse);
    }
  };

  /**
   * @name deleteQuestion
   * @description Sends API response to delete an specific question with idToDelete
   *
   * @param {String} idToDelete
   * @returns null
   */
  const deleteQuestion = async (idToDelete) => {
    const apiResponse = await fetch(`${websiteURL}/${idToDelete}`, {
      method: "DELETE",
    });
    if (apiResponse.status === 204) {
      //Simple one line to delete a single item
      const newQuestions = questions.filter(
        (question) => question.id !== idToDelete
      );

      //Set state with new items
      setQuestions(newQuestions);
    } else {
      console.log(apiResponse);
    }
    //TODO: Handle unsuccessful delete
  };

  useEffect(getQuestions, []);
  return (
    <div className="App">
      <h1>Codele</h1>
      <nav>
        <Link to="/">Home</Link>
        {/*<Link to="/daily">Daily</Link>*/}
        <Link to="/questions">Questions</Link>
      </nav>
      <Outlet
        context={[questions, createNewQuestion, updateQuestion, deleteQuestion]}
      />
    </div>
  );
}

export default App;
