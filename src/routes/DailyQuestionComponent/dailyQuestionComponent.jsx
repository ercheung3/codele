import "./dailyQuestionComponent.css";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DailyQuestionComponent = (props) => {
  const [questions, createNewQuestion] = useOutletContext();
  const [dailyQuestion, setDailyQuestion] = useState();
  const selectDailyQuestion = () => {
    //ADD LOGIC TO SELECT NEW QUESTION BASED ON TIME:DAY
    //Math.random()
    //HOW TO KNOW THE QUESTION IS THE DAILY QUESTION?
    //IS IT FROM QUESTIONS MODEL
    //OR FROM STATE
    //IF STATE THEN WHAT HAPPENS ON REFRESH?
    //IF MODEL THEN SHOULD I MAKE A BOOLEAN CALLED DAILY
    //THAT CHANGES FROM USE EFFECT?
    //MAYBE INT DAILY
    //PRESET 30 days? and within useEffect, set it
    console.log("This will run every 10 second!");
    let questionIndex = parseInt(Math.random() * questions.length);
    console.log("Question Index: " + questionIndex);
    console.log(!!dailyQuestion);
    setDailyQuestion(questions[questionIndex]);
  };
  useEffect(selectDailyQuestion, []);

  return (
    <div>
      <h2>DAILY QUESTION</h2>
      {!!dailyQuestion ? (
        <>
          {dailyQuestion.source.toLowerCase() === "codewars" ? (
            <div className="daily-question question">{dailyQuestion.text}</div>
          ) : (
            <ReactQuill
              readOnly="true"
              theme="snow"
              value={dailyQuestion.text}
            />
          )}
        </>
      ) : (
        <Button onClick={selectDailyQuestion}>Show Question</Button>
      )}
    </div>
  );
};

export default DailyQuestionComponent;
