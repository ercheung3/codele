import "./App.css";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderComponent from "./components/HeaderComponent/headerComponent";
import HomeComponent from "./components/HomeComponent/homeComponent";
function App() {
  const [questions, setQuestions] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();
  //const websiteURL = "http://localhost:8000/api/question";
  const websiteURL = "https://codele-backend.herokuapp.com/api/question";
  //const codewarsapi = "https://www.codewars.com/api/v1/code-challenges/";

  const [isModalActive, setIsModalActive] = useState(true);
  const toggleIsModalActive = () => {
    setIsModalActive(!isModalActive);
  };

  const getQuestions = async () => {
    const questions = await fetch(`${websiteURL}`);
    const parsedQuestions = await questions.json();
    setQuestions(parsedQuestions);
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
      navigate("/questions");
    } else {
      console.log(apiResponse);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [location]);

  return (
    <div className="App">
      <HeaderComponent
        isModalActive={isModalActive}
        toggleIsModalActive={toggleIsModalActive}
      ></HeaderComponent>
      <HomeComponent
        isModalActive={isModalActive}
        toggleIsModalActive={toggleIsModalActive}
      ></HomeComponent>
      <Outlet
        context={[questions, createNewQuestion, updateQuestion, deleteQuestion]}
      />
    </div>
  );
}

export default App;
